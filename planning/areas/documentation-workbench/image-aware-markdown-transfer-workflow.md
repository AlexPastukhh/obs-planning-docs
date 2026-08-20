# Copy A Linked Note And Repository Images Workflow

Status: legacy planning/compatibility reference / not current Linked Notes authority
Doc version: v1.0.0-image-aware-note-transfer
Scope: independently traversable behavior for copying the visible Markdown of one verified Linked Note into another Markdown file in the same GitHub repository and branch while copying or safely reusing repository-backed image assets and rewriting their destinations.

> **Current Linked Notes ownership migrated.** This retained file is planning/history/compatibility context, not a current behavior or Use-Case owner. Current semantics live in [`scenarios/README.md`](../../documentation/tools/tampermonkey/linked-notes/scenarios/README.md). When this retained body conflicts with current Linked Notes docs, the current Linked Notes corpus wins.

## 1. Purpose

Provide one explicit image-aware repository transfer instead of treating a Markdown text copy as complete when its image files remain elsewhere or become unreachable.

This workflow owns the complete transfer lifecycle introduced by `ITEM-134 / IMAGE-AWARE-REPOSITORY-MARKDOWN-TRANSFER`. It consumes Linked Note content from `ITEM-124`, safe image/path interpretation from `ITEM-132` and the normal repository review/conflict boundary from `ITEM-34B`.

It is different from `ITEM-107 / AI-TRANSFER-EXPANSION`: that item creates a bounded non-mutating copy for an AI conversation, while this workflow explicitly writes repository Markdown and image files.

## 2. Trigger And Result

**Trigger:** the user opens a verified repository-backed Note, chooses `Copy to Markdown file`, selects a target Markdown path in the same owner/repository/branch, chooses create or append mode, reviews the planned document and assets, and explicitly starts the copy.

**Successful result:** the target Markdown contains the visible Note title/body, each supported repository-backed image resolves through a target-relative path to a verified copied or safely reused asset, and all intended remote writes have passed exact read-back verification.

**Other explicit results:** invalid source binding, unsupported or pending image, missing source asset, external image preserved without download, target conflict, image collision, partial verified asset writes, uncertain network result or target Markdown verification failure.

## 3. Preconditions

- the source Note has a verified owner/repository/branch/path binding;
- the target remains in the same owner/repository/branch in the bounded prototype;
- the source and target repository paths pass repository-path validation;
- create mode targets an absent Markdown path;
- append mode targets an existing bounded text Markdown file with a known SHA;
- the user has explicitly reviewed source, target, mode and planned asset results;
- a token with required repository read/write permission is available only at execution time.

## 4. End-To-End Flow

```text
open verified source Note
  → choose Copy to Markdown file
  → select target Markdown path
  → choose create or append mode
  → read exact target state when append is selected
  → extract visible Note title/body without quiet Note metadata
  → discover Markdown images and allowlisted img sources
  → classify each image:
      repository-backed;
      external HTTP(S);
      pending/local;
      invalid/unsupported
  → resolve each repository-backed source path in the Note repository context
  → calculate target-owned <target-name>.assets/ destinations
  → reserve the complete target asset path set, including same-operation filename collisions
  → detect absent, identical or conflicting target assets
  → show transfer plan and diagnostics
  → on explicit confirmation:
      reread every source image and verify preview SHA/bytes;
      revalidate the complete reserved target plan before the first write;
      copy missing assets;
      safely reuse byte-identical assets;
      choose deterministic safe suffixes for different-byte collisions;
      verify every successful asset write/read
  → rewrite repository image destinations relative to target Markdown
  → create or SHA-protected append target Markdown
  → read target Markdown back and verify exact intended content
  → show complete or explicit partial result.
```

No repository write occurs during selection, parsing, target calculation or preview.

## 5. Mandatory Stages

### Stage 1 — Select Exact Source And Target

The source Note binding and target owner/repository/branch/path are visible. The prototype blocks cross-repository or cross-branch transfer rather than silently creating ambiguous relative paths.

### Stage 2 — Select Create Or Append

Create requires an absent target. Append reads the current target Markdown and SHA and adds the transferred Note as a new section. Arbitrary cursor editing of repository files is outside the first bounded slice.

### Stage 3 — Materialize Visible Note Content

The transfer uses the visible Note title/body. Quiet `obs-linked-note` metadata, local category intent, cache state, backlinks and temporary object URLs are not copied into the ordinary target document.

### Stage 4 — Discover And Classify Images

The planner recognizes Markdown image syntax and allowlisted HTML `img` sources. It resolves repository-relative sources against the exact source Note path. External HTTP(S) sources remain external and are not downloaded automatically. Pending/local and invalid sources block a false complete result.

### Stage 5 — Plan Target Assets

The default destination is a target-owned sibling folder:

```text
<target-file-without-.md>.assets/<safe-filename>
```

The plan deduplicates repeated references to one source asset. It reserves all target paths as one batch, so two different source assets with the same filename receive their final copy/reuse/suffix paths before execution. An absent target is copied. An existing byte-identical target is reused. A different-byte collision receives a deterministic suffix instead of being overwritten.

### Stage 6 — Copy And Verify Assets

Before any target write, every source image is reread and compared with the preview SHA and bytes, and the complete reserved target plan is recalculated. Each copy then uses a binary-safe GitHub Contents write followed by byte/hash/size verification. A response alone is not success. Verified assets are not deleted automatically when a later operation fails.

### Stage 7 — Rewrite Image Destinations

Every copied/reused repository image receives a portable destination relative to the target Markdown file. Path encoding must round-trip spaces, Unicode, parentheses, brackets and percent signs without allowing traversal.

### Stage 8 — Write And Verify Markdown

Create proves absence; append uses the exact known target SHA. The final target content is read back and compared with the intended bytes before success is shown.

### Stage 9 — Report Complete Or Partial Result

The result distinguishes copied, reused, external-preserved, unresolved, failed and pending assets plus target Markdown state. Visible contextual actions can prepare a fresh plan, retry a failed image/Note stage or verify/retry target Markdown only. After an unknown write result, recovery first reads the exact target: matching intended content completes verification without another write; an unchanged base permits a safe retry; differing content becomes conflict.

## 6. Branches And Failure Behavior

| Situation | Required result |
|---|---|
| Target path is absent in create mode | create only after absence is confirmed |
| Target exists in create mode | stop before writes and require another target/mode |
| Target changes after append preview | SHA conflict; preserve transfer plan and require refresh |
| Source image occurs several times | one physical asset operation; rewrite every occurrence |
| Destination asset is byte-identical | reuse it; perform no unnecessary write |
| Destination asset has different bytes | generate a safe deterministic suffixed path; do not overwrite |
| Source asset is missing/inaccessible | explicit blocked/unresolved result; do not fabricate image success |
| Image source is external HTTP(S) | preserve source URL; do not download automatically |
| Image source is pending/local | block transfer until source Note is durably saved |
| Image type/size is unsupported | explicit unsupported result |
| One asset write succeeds and another fails | preserve verified asset, show partial result and retry failed work only |
| Assets succeed but target Markdown conflicts/fails | preserve plan and verified assets; do not perform destructive rollback |
| Network result is uncertain | read the exact remote target before classifying success/failure |
| Source and target differ by owner/repository/branch | block in first prototype |
| User cancels before execution | no remote write |

## 7. Data And Identity

| Data | Identity/owner | Invariant |
|---|---|---|
| Source Note | stable Note ID + verified owner/repository/branch/path | source remains unchanged |
| Visible transfer content | source title/body snapshot | excludes quiet Note metadata and derived state |
| Source image | owner/repository/branch/path + bytes/hash | resolved in source Note context |
| Target Markdown | owner/repository/branch/path + absent/SHA state | create or conflict-aware append only |
| Target asset | target repository path + verified bytes/hash | copied or reused, never silently overwritten |
| Rewritten destination | target-Markdown-relative encoded path | portable and traversal-safe |
| Transfer plan | local operation ID + source/target snapshots | derived/recoverable, not repository truth |
| Credential | private local token | never written to Markdown, paths, URLs or evidence |

## 8. Review Gates

Before execution:

- source and target repository identities are visible;
- create/append mode and current target state are visible;
- every discovered image has a classification and planned action;
- collisions, external sources and unresolved images are visible;
- no pending/local source is represented as transferable repository content.

Before success:

- every copied asset has byte-exact read-back verification;
- every reused asset is byte-identical;
- the final rewritten Markdown has no unresolved managed source reference;
- the target Markdown has exact read-back verification;
- partial results remain explicit;
- source Note and source assets remain unchanged.

## 9. Selected Prototype Shape

The bounded `0.6.4-prototype` uses:

```text
shared repository target picker for the target Markdown path;
create or append-as-new-section target modes;
Markdown image and allowlisted img source discovery with fenced/code-span/indented-code/HTML-comment/raw-code-like-container exclusion;
same-owner/repository/branch restriction;
target-owned sibling .assets folder with full-plan path reservation;
binary-safe GitHub Contents API writes;
byte-identical reuse and deterministic collision suffixes;
portable relative-path rewriting;
explicit per-asset/target feedback with contextual retry actions;
no automatic rollback, deletion or external-image import.
```

This is implementation evidence, not accepted production architecture or a general repository editor.

## 10. Minimum Acceptance Run

```text
create a verified source Note with two repository images;
include one image twice and one allowed img tag;
copy it to a new nested Markdown target;
verify one physical copy per unique source asset;
verify all target-relative paths render on GitHub;
repeat with append mode;
repeat when one target asset is already byte-identical;
repeat when one target path contains different bytes and receives a suffix;
introduce one missing source image and see an explicit incomplete result;
change target Markdown after preview and confirm no blind overwrite;
force one asset success followed by target conflict and retry without duplicate copies;
confirm source Note/images are unchanged;
confirm no token, object URL or local path appears in target content.
```

## 11. Relationships

- `ITEM-134` owns this complete behavior.
- `ITEM-124` owns the source Linked Note and inserted repository image lifecycle.
- `ITEM-132` owns sanitized image interpretation/rendering and authenticated reads, not transfer writes.
- `ITEM-34B` owns ordinary repository change/diff/review boundaries.
- `ITEM-114` owns stable repository-relative target identity.
- `ITEM-130` owns prominent contextual and partial-result recovery behavior.
- `ITEM-131` supplies exact same-repository target selection.
- `ITEM-107` remains a different non-mutating AI-transfer capability.

## 12. Boundaries

This workflow does not:

- move or delete source images;
- remove orphan assets automatically;
- download external images automatically;
- support cross-repository or cross-branch transfer in the first prototype;
- provide arbitrary repository-file editing or cursor placement;
- copy Linked Note metadata, categories or backlinks into ordinary target Markdown;
- promise global atomicity across several GitHub files;
- authorize background writes, local Git commit or push;
- accept the userscript as production architecture.
