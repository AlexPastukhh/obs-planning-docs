# Linked Notes Prototype Roadmap

Status: working project-local implementation roadmap / priority view
Scope: future directions for the OBS Linked Notes prototype. This file is not the canonical Planning Item owner, does not accept production architecture and does not authorize implementation by itself.

Current implementation baseline: `0.7.2-prototype`.

Implementation documentation entry: [`planning/documentation/tools/tampermonkey/linked-notes/README.md`](../../documentation/tools/tampermonkey/linked-notes/README.md).

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

A roadmap direction is not an accepted Planning Item transformation. If a direction changes canonical capability meaning or semantic Use-Case identity, run the separate Planning Item / Use-Case reconciliation route first.

## 2. NOW — Direction 1: Redesign ChatGPT Data Acquisition

### Current checked state

Chat Response Reader currently supports:

```text
Open in Reader
  → selected rendered assistant DOM
  → derived Markdown
  → sourceAccuracy=derived;

Paste Markdown
  → user-provided source
  → sourceAccuracy=exact.
```

No private ChatGPT API is part of the current contract.

Current owners:

- [`chat-response-reader-workflow.md`](chat-response-reader-workflow.md);
- [`CHAT-RESPONSE-READER.md`](../../documentation/tools/tampermonkey/linked-notes/CHAT-RESPONSE-READER.md);
- `CHAT-001` in [`KNOWN-ISSUES.md`](../../documentation/tools/tampermonkey/linked-notes/KNOWN-ISSUES.md).

### Problem / direction

The Reader should not own the mechanism used to acquire ChatGPT response data. The current rendered-DOM derivation is useful fallback behavior but is externally fragile and cannot claim original-source fidelity.

### Target outcome

Introduce a message-source boundary conceptually shaped like:

```text
ChatMessageSource.read(message)
  → content
  → format
  → sourceKind
  → accuracy
  → diagnostics
```

Reader consumes the normalized result and no longer needs to know whether it came from ChatGPT-native copy behavior, semantic DOM derivation or explicit Paste.

### Investigation order

1. Inspect the current ChatGPT UI Copy-response behavior and determine whether its source can be consumed safely/stably from the userscript boundary.
2. If a reliable source exists, prototype it as the preferred adapter without making private/internal ChatGPT APIs part of the contract.
3. Move current semantic rendered-DOM conversion behind a dedicated adapter and retain `derived` accuracy.
4. Keep explicit Paste Markdown as the guaranteed exact fallback.
5. Compare accuracy/failure behavior on headings, lists, tables, code blocks, links and details-like content before selecting the preferred source path.

### Conservative fallback

If no stable better source is found, keep the current semantic DOM adapter + exact Paste fallback and improve diagnostics rather than claiming exact source recovery.

### Exit evidence

- source interface and accuracy semantics tested independently of Reader UI;
- one documented preferred source or explicit decision to retain DOM as primary;
- fallback behavior proven when external ChatGPT UI changes;
- no private/internal API dependency introduced silently.

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

Current owner/gap record: `COPY-001` in [`KNOWN-ISSUES.md`](../../documentation/tools/tampermonkey/linked-notes/KNOWN-ISSUES.md).

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

Current issue: `GITHUB-001` in [`KNOWN-ISSUES.md`](../../documentation/tools/tampermonkey/linked-notes/KNOWN-ISSUES.md).

### Phase A — Write-entrypoint audit

Inventory every remote write path, including at least:

```text
Linked Note save/update
Copy to chat workspace / Note recovery writes
Note image asset writes
image-aware Markdown transfer
ordinary Files create/edit/folder/structure/copy writes
category definition create/update/membership writes
Reference Object registry/definition/use update writes
repository-template-backed normal file creation
```

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

### RESEARCH — Contents API versus Git Data API

Do not switch APIs before the write audit.

Research only if evidence shows a real need for atomic multi-file repository updates:

```text
current GitHub Contents API sequential verified writes
vs
Git Data tree/commit construction and one commit update
```

Questions:

- which current failures would an atomic tree/commit actually solve;
- branch/ref concurrency and expected-base semantics;
- asset + Markdown + registry multi-resource transactions;
- recovery after uncertain ref update;
- complexity/security/test cost.

### Exit evidence

- complete write-entrypoint inventory;
- reproducible failing cases with safe diagnostics;
- agreed failure vocabulary;
- decision whether common orchestration is justified;
- API-change decision only after evidence.

## 5. NEXT — Documentation And Continuity Discipline

The repository should remain the handoff/memory layer between chats.

Maintain:

```text
linked-notes/README.md
APP-OVERVIEW.md
ARCHITECTURE.md
DATA-AND-STATE.md
KNOWN-ISSUES.md
this roadmap
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
- automatic Reference Object propagation;
- generic managed-object runtime as a prerequisite;
- changing canonical Planning Items merely because this prototype roadmap proposes an implementation direction;
- claiming production architecture from Tampermonkey prototype evidence.
