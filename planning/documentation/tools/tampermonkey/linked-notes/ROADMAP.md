# OBS Linked Notes Roadmap

Status: active current-prototype implementation roadmap / priority view
Scope: future directions for OBS Linked Notes. This file is not current Use-Case authority, does not accept production architecture and does not authorize implementation by itself.

Current implementation baseline: `0.8.0-prototype`.

Current semantic entry: [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md).
Detailed Scenario navigation: [`scenarios/README.md`](scenarios/README.md).

## 1. Roadmap Rules

```text
NOW
  → current investigation/documentation priority;

NEXT
  → likely implementation direction after required evidence;

LATER
  → valuable extension that should not block current priorities;

RESEARCH
  → architectural option requiring evidence before selection;

DEFERRED
  → intentionally not part of the active direction.
```

A roadmap direction is not current application semantics merely because it is written here. If a direction changes current Linked Notes capability meaning or semantic Use-Case identity, update `USE-CASE-REGISTRY.md` first and update affected Scenario owners/navigation in the same reviewed change when detailed behavior changes. Broader Documentation Workbench planning may still retain historical/planning context, but it is not current Linked Notes semantic authority.

## Implemented baseline — local-first files and Ordered Reference Lists

The `0.8.0-prototype` baseline now includes:

- one workspace-scoped pending repository-file queue compatible with earlier Reference Object drafts;
- local-first file/folder/structure/copy/category/Reference Object/ordering actions;
- separate `Update current file` and one-commit Git Data `Update all` publication;
- inline Ordered Reference Lists whose whole-line/paragraph items contain Reference Object uses;
- current/stale/unresolved warnings in the open file and Files tree after a freshness scan.

Browser and real-GitHub acceptance remain evidence gaps; implementation and transport tests are not substitutes for that acceptance.

### LATER / RESEARCH — Reference Object propagation policy

Consider an optional definition-level policy stating whether a particular Reference Object may be propagated automatically. This is deliberately not in the current marker/registry schema. Before selection, research review semantics, default-deny migration, stale surrounding-context warnings and how an automatic permission interacts with Ordered Lists. Do not add per-use policy or silent background propagation by assumption.

## 2. NOW — Direction 1: Explicit ChatGPT-to-Linked-Notes Handoff

### Current checked state

Chat Response Reader currently has two implemented acquisition paths:

```text
Open in Reader
  → selected rendered assistant DOM
  → derived Markdown
  → sourceAccuracy=derived;

Paste Markdown
  → user-provided source
  → sourceAccuracy=exact.
```

Reader rendering is useful independently of transport and supports the documented safe Markdown/details projection. Manual Paste is the current reliable explicit exact-source transfer. The DOM path remains current prototype implementation evidence, but the project does not select programmatic extraction from the ChatGPT page/UI as the target automatic transport architecture.

Current owners:

- `UC-LN-READER` in [`USE-CASE-REGISTRY.md`](USE-CASE-REGISTRY.md), with detailed behavior routed through [`scenarios/README.md`](scenarios/README.md);
- [`CHAT-RESPONSE-READER.md`](CHAT-RESPONSE-READER.md);
- repository-facing response format `.linked-notes/CHAT-RESPONSE-FORMAT.md`;
- `CHAT-001` in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).

### Problem / direction

The Reader should not own extraction of response content from the ChatGPT UI. The desired automatic direction is an explicit supported handoff in which response content is supplied across an integration boundary to Linked Notes.

### Target outcome

Keep a transport/source boundary conceptually shaped like:

```text
ChatMessageSource / response handoff
  → content
  → format
  → sourceKind
  → accuracy
  → diagnostics
      ↓
Reader
```

Reader consumes the normalized result and remains independent of the concrete supported integration mechanism.

### Investigation order

1. Define the minimum handoff payload and source-accuracy semantics needed by Reader.
2. Investigate supported integration mechanisms that can explicitly supply response content to Linked Notes without Linked Notes scraping the ChatGPT page/UI.
3. Compare content fidelity, user-action/confirmation requirements, local delivery options and failure behavior.
4. Keep explicit Paste Markdown as the reliable exact fallback during the investigation.
5. Keep current DOM-derived behavior documented as prototype evidence until a separately reviewed runtime change replaces or removes it.

Candidates may include an app/plugin/action/MCP/API or another supported integration, but this roadmap does not select one in advance.

### Not selected as target architecture

- programmatic DOM extraction as the automatic response-transfer contract;
- programmatic activation of the ChatGPT UI Copy button as an extraction mechanism;
- private/internal ChatGPT API dependence.

### Conservative fallback

If no supported automatic handoff is selected yet, keep Reader rendering + manual exact Paste. The existing DOM-derived path may remain temporary prototype evidence, but do not promote it to the long-term integration contract.

### Exit evidence

- one documented supported handoff mechanism or an explicit decision that automatic handoff remains deferred;
- tested payload/source-accuracy semantics independent of Reader UI;
- documented user-action/confirmation and failure/retry behavior;
- manual exact Paste remains available as fallback;
- no silent dependence on private/internal APIs or page scraping as the target architecture.

## 3. NOW — Direction 2: Normal Content Copy And Chat Handoff

### Current checked state

Current copy/export capabilities are fragmented:

```text
Reader → Copy Markdown
Files → link/heading-link copy
Reference Objects → marker/value-oriented copy actions
App State → diagnostic JSON snapshot
```

Full App State is diagnostic application state, not normal content copy.

Current owner/gap record: `COPY-001` in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).

### Target outcome — first slice

Provide consistent explicit copy actions for one selected content object.

For a Note:

```text
Copy body Markdown
Copy title + body
Copy as Chat context
```

For a repository file:

```text
Copy file contents
Copy path + contents
Copy as Chat context
```

The first Chat-context projection should preserve literal content and useful identity metadata rather than summarize/rewrite it.

Example shape, subject to implementation review:

```text
# Repository file context
Repository: owner/repo
Branch: branch
Path: docs/file.md
SHA: <known snapshot SHA>

## Content
<literal file content>
```

### NEXT — Context Basket

Only after single-item copy is useful and bounded, consider:

```text
+ current file
+ selected Note(s)
+ selected repository file(s)
→ one bounded chat-handoff payload
```

Questions before implementation:

- maximum payload size and truncation/refusal behavior;
- whether unsaved draft or verified remote snapshot is copied, and how that is labelled;
- binary/non-text handling;
- duplicate document handling;
- identity/metadata fields required for another chat to act safely.

### Exit evidence

- one-click Note copy proven;
- one-click File copy proven;
- copied content labels source/snapshot identity accurately;
- no credential leakage;
- Full App State remains separate diagnostic functionality.

## 4. NOW — Direction 3: GitHub Save Reliability

### Current checked state

Existing workflows already document safety requirements including explicit remote action, path validation, target absence or SHA/base protection where relevant and read-back verification.

The user reports GitHub save problems, but the exact reproduced failure path has not yet been documented. Do not infer a root cause before evidence.

Current issue: `GITHUB-001` in [`KNOWN-ISSUES.md`](KNOWN-ISSUES.md).

### Phase A — Write-entrypoint audit

Inventory every **actual remote write entrypoint**, distinguishing local business actions from the later publication boundary:

```text
UC-LN-PUBLISH / Update current file
UC-LN-PUBLISH / Update all
Linked Note save/update/recovery
Note image asset writes
image-aware Markdown transfer
any remaining feature-specific remote write path discovered in source
```

Files create/edit/structure/copy, category changes, Reference Object changes, Ordered List changes and repository-template-backed New File are **local staging producers** in the current `0.8.0` model; audit their handoff into `UC-LN-PUBLISH` rather than misclassifying each producer as a separate remote write entrypoint.

For each entrypoint record:

```text
trigger
intended target(s)
preflight/read prerequisites
captured absence/SHA/base
frozen intended bytes/hash
number/order of writes
verification/read-back
local state before write
local state after verified write
local state after conflict/error/unknown result
retry semantics
partial-result semantics
UI feedback/diagnostics
```

### Phase B — Common result vocabulary

Derive one shared diagnostic classification unless evidence requires feature-specific variants:

```text
verified
conflict
permission_denied
network_failed_before_write
verification_unknown
remote_different
partial_verified
cancelled_before_write
```

The vocabulary is for consistent state/diagnostics; it does not imply all writes become globally atomic.

### Phase C — Unified Verified Write Engine candidate

After the audit, evaluate extracting a common orchestration/state-machine boundary:

```text
prepare
→ preflight
→ freeze intended bytes/base
→ write
→ verify
→ classify
→ apply verified local result
```

Keep feature-specific planning where needed, especially multi-resource Note/image/transfer operations.

### Save diagnostics

A future failure surface should be able to copy a safe diagnostic record containing operation/phase/target/base/result/verification/local-state information without the raw credential.

### RESEARCH — Extend Verified Publication/Transaction Boundaries Only Where Needed

The standard pending-file publisher already has two selected mechanisms:

```text
Update current file
  → one GitHub Contents API path
  → exact read-back;

Update all
  → Git Data blobs/tree/commit
  → one non-force ref transition
  → commit/tree/blob verification.
```

Do not reopen that choice merely for API uniformity. After the write audit, research whether any **remaining compound Note/image/transfer path** has a demonstrated failure or atomicity requirement that justifies reusing/extending Git Data or a shared verified-write orchestration boundary.

Questions:

- which reproduced failures are outside the existing `UC-LN-PUBLISH` guarantees;
- whether Note/image/transfer resources require one remote transaction or only better diagnostics/recovery;
- branch/ref concurrency and expected-base semantics;
- recovery after an uncertain ref update or partially verified compound operation;
- complexity/security/test cost of extending common orchestration.

### Exit evidence

- complete write-entrypoint inventory;
- reproducible failing cases with safe diagnostics;
- agreed failure vocabulary;
- decision whether common orchestration is justified;
- any extension/API-change decision only after evidence, without regressing the current `UC-LN-PUBLISH` contract.

## 5. NEXT — Documentation And Continuity Discipline

The repository should remain the handoff/memory layer between chats.

Maintain both documentation routes:

```text
developer / implementation chat
  → linked-notes/README.md
  → scenarios/README.md
  → USE-CASE-REGISTRY.md
  → APP-OVERVIEW.md
  → ARCHITECTURE.md
  → DATA-AND-STATE.md
  → KNOWN-ISSUES.md
  → this roadmap;

repository-working / application-context chat
  → .linked-notes/README.md
  → .linked-notes/AGENT-GUIDE.md
  → only applicable agent-facing contracts.
```

Feature implementation should update focused owners rather than appending another long historical block to the entry README.

## 6. LATER

Candidate later directions/open decisions that are not active commitments:

- bounded multi-document Context Basket;
- explicit import/restore only if a real Full App State restoration use case is accepted;
- better operation diagnostics/history for repository writes;
- final Note identity and filename convention;
- file-per-Note versus shared/hybrid durable Note storage;
- repository/anchor picker UX;
- credential lifecycle beyond local prototype use;
- remote index derivation and stale-cache behavior;
- final compare/recovery UX;
- rename/delete/link-repair workflows only under separately reviewed semantics;
- production packaging and shared-library extraction if the generated userscript architecture becomes difficult to maintain;
- optional local workspace filters for the Note list if they are still useful;
- cross-repository transfer only after current same-repository behavior is stable.

## 7. DEFERRED / Not Selected By This Roadmap

- automatic background repository writes;
- private/internal ChatGPT API dependence as an assumed solution;
- programmatic ChatGPT page/DOM/Copy extraction as the selected automatic handoff architecture;
- automatic Reference Object propagation;
- generic managed-object runtime as a prerequisite;
- treating this roadmap or legacy Documentation Workbench planning files as current Linked Notes semantic authority;
- claiming production architecture from Tampermonkey prototype evidence.
