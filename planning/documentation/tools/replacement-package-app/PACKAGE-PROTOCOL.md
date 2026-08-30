# Replacement Package Protocol

Status: active V0.1 current contract + selected target source-state delta
Scope: exact protocol shared by the ChatGPT replacement-package producer and the local Windows Replacement Package App. Consumer-only state, Git execution and UI behavior are documented after the shared literal.

Producer owner:

`planning/documentation/build-replacement-archive-workflow.md`

Consumer/application entry:

`planning/documentation/tools/replacement-package-app/README.md`

## 1. Authority

The literal inside `obs-ref:def` below is the canonical shared producer/consumer protocol. The producer workflow carries a materialized `obs-ref:use` copy. Change shared fields/layout/rules here first, then synchronize the use through the Reference Object workflow.

<!-- obs-ref:def id="ro_replacement_package_shared_protocol" -->
### V0.1 package and action protocol

A replacement package is a ZIP with this repository-relative layout:

```text
<package>.zip
├── PACKAGE.json
├── base-files/
│   └── <repo-relative paths for replace/delete>
└── replacement-files/
    └── <repo-relative paths for add/replace>
```

`PACKAGE.json` schema version 1 is:

```json
{
  "schemaVersion": 1,
  "packageId": "<unique UUID for this ZIP>",
  "changeSetId": "<stable UUID for one logical ChangeSet>",
  "changeSetLabel": "<stable human-readable work label>",
  "repositoryIdentity": "github:<owner>/<repo>",
  "operations": [
    {"path":"repo/relative/path","action":"add|replace|delete"}
  ]
}
```

Shared rules:

- `repositoryIdentity` identifies the GitHub repository only; branch is not part of the identity. The producer emits a verified `github:<owner>/<repo>` value and the Windows consumer compares owner/repo case-insensitively against the configured repository's raw `remote.origin.url`.
- operation paths use `/`, are repository-relative Windows-valid file paths, contain no absolute prefix, `.` / `..` segment, empty segment, control character, reserved Windows name/character, trailing dot/space or traversal, and must not collide after Windows case-insensitive normalization;
- every concrete ZIP gets a new `packageId`;
- a correction/continuation of the same logical reviewed work keeps the same `changeSetId`; independent work gets a new `changeSetId`;
- `changeSetLabel` remains stable for one ChangeSet;
- `add`: `base-files/<path>` is absent, `replacement-files/<path>` is required, and the consumer requires the current target path to be absent before first ownership;
- `replace`: both payloads are required and current target bytes must exactly equal `base-files/<path>` before mutation;
- `delete`: base payload is required, replacement payload is absent, and current target bytes must exactly equal `base-files/<path>` before mutation;
- V0.1 has no native rename, chmod-only, symlink or submodule operation; a semantically acceptable rename is represented as delete + add;
- payload files not declared by `operations[]` are invalid;
- replacement payloads are complete resulting file bytes, never snippets or patches;
- `PACKAGE.json` is the authority for repository operations.

The handoff envelope is:

```text
OBS-ACTION/1
action: apply-package
name: <human-readable ApplicationAttempt label>
archive: <downloaded archive filename hint>
packageId: <same packageId as PACKAGE.json>
chatTabTitle: <optional legacy exact intended ChatGPT conversation/tab title hint>
chatContextToken: <optional UUID emitted by an explicit capture-chat-context invocation side effect>
```

Action rules:

- `archive` is a filename/hint, not an absolute path or repository-operation authority;
- the consumer resolves/selects a concrete ZIP and requires its manifest `packageId` to exactly match the action `packageId`;
- `name` is presentation/history text and may vary between attempts;
- `chatContextToken` is optional and is emitted only when the active command invocation explicitly carried `capture-chat-context`. It is an opaque one-invocation bind/rebind authority: after unique resolution the captured conversation becomes the persisted Review chat even when another conversation was already bound. It never identifies the package, Repository Target or ChangeSet, never grants repository-operation authority, and MUST NOT be copied into a later `OBS-ACTION` unless that later command invocation supplies its own token. The consumer validates it as a UUID and one token may be associated with only one package/ChangeSet request;
- `chatTabTitle` remains optional legacy fallback metadata. When `chatContextToken` is present, token resolution is authoritative for that action and title matching/rebind preparation is not performed. Token rebind does not ask again because explicit `Bind + ...` supplied rebind authority; legacy title behavior keeps its existing keep/rebind/cancel confirmation. Consumer title-matching configuration is local application state and is never carried in `OBS-ACTION`;
- before any repository mutation, the consumer parses the action once and builds one prepared Apply context. `chatTabTitle` is normalized together with current inventory titles by deleting only the Unicode characters configured in the persisted `reviewChatTitleIgnoredCharacters` setting, then compared by exact case-sensitive equality. The default ignored-character set is empty, preserving literal matching. Zero or multiple matches never guess a destination; they are warnings in operation Output and Apply may continue with manual binding available;
- in the interactive Swing consumer, when exactly one prepared destination differs from an existing persisted Review-chat binding, repository mutation requires an explicit user decision made before Apply: keep the existing binding, Apply and rebind to the prepared destination, or cancel. Rebind authorization is refused while existing bridge safety rules make rebinding unsafe. If the ChangeSet/binding state used by the prepared decision changes before execution, the prepared Apply is stale and must be prepared/confirmed again before mutation. The current non-interactive CLI `apply --action-file` compatibility path cannot obtain this confirmation and, as a known accepted divergence, keeps the existing binding/no action-driven rebind;
- legacy title-assisted bind/rebind occurs only after successful repository Apply and uses the already prepared `conversationKey` through the same persisted binding service used by manual selection; the title is not reparsed/rematched after Apply. Failed repository Apply leaves the binding unchanged. Duplicate browser tabs of one conversation remain governed by existing conversation-key / duplicate-tab claim serialization rather than by the title hint;
- token-assisted resolution is asynchronous and begins when an authorized Apply executes. The Java bridge exposes the pending token to the extension; background asks all live ChatGPT tab agents, and an agent answers only from that tab's `sessionStorage` capture record `{chatContextToken, conversationKey, observedTitle, capturedAt}`. Multiple answers for the same `conversationKey` are one logical result; one token reported for different conversation keys is a capture conflict and no destination is guessed;
- a unique token result immediately establishes the captured conversation as the persisted Review chat, including replacing a different existing binding. The bind/rebind is independent of repository Apply outcome. A destination change cancels only safely cancellable Pending/Claimed older Review tasks; already Preparing/SendArmed/SendClicked interactions retain their frozen original destination;
- repository Apply never waits for token lookup. At the successful Apply/current-ReviewDiff cutoff, a token already bound/rebound can queue that current ReviewDiff. Pending/conflicted lookup skips only that automatic delivery. Late resolution still binds/rebinds for future deliveries but MUST NOT retroactively send the already-skipped ReviewDiff; failed repository Apply does not cancel lookup or revert a token binding;
- known accepted concurrency risk: the prepared binding/state assumptions are revalidated before repository mutation, but manual Bind/Unbind is not serialized against an already-running background Execute. A manual binding change made during Execute may therefore be overwritten by the previously authorized prepared rebind after successful Apply; this revision does not claim that concurrency window is hardened;
- repository operations never appear in `OBS-ACTION`;
- clipboard/repo-file ReviewDiff handling never appears in `OBS-ACTION`; it is application configuration;
- V0.1 Finalize is not a second `OBS-ACTION`: the consumer uses the selected ChangeSet's persisted current ReviewDiff as the implicit Finalize baseline plus a local commit message; the ReviewDiff SHA-256 remains internal application state and is not user input.
<!-- /obs-ref:def -->

## 2. Consumer-Only Resolution

The V0.1 application has a configured repository root and optional selected archive path. When only an `OBS-ACTION` is supplied, archive resolution is bounded to explicit candidates such as the configured Downloads directory/current selection. A filename is only a hint; `packageId` is the package identity.

Resolution result must be unique after opening candidate `PACKAGE.json` files and comparing `packageId`. Zero matches produce `PACKAGE_NOT_FOUND`; ambiguous/malformed candidates do not authorize mutation.

Optional destination resolution has two paths. Without `chatContextToken`, legacy `chatTabTitle` resolution remains deliberately **pre-Apply**: one prepared operation freezes the title-normalization result and any unique conversation candidate. With `chatContextToken`, title matching is skipped; authorized Execute starts a non-blocking token lookup against live tab agents while repository Apply proceeds. The token maps only to a capture made by the explicit originating Helper invocation and is not a physical tab identity. Apply success, binding outcome and ReviewDiff delivery outcome remain separate truths.

## 3. Consumer Validation Order

```text
parse OBS-ACTION once + resolve/select concrete ZIP
→ open ZIP without unsafe extraction
→ validate archive entry paths/collisions
→ parse PACKAGE.json
→ validate schema/IDs/repositoryIdentity/operations
→ validate declared payload set
→ resolve Repository Target candidates + exact ChangeSet state
→ when no chatContextToken is present, resolve optional legacy `chatTabTitle` through current local title-matching policy
→ emit non-blocking prepare warnings to Output
→ in interactive Swing, when unique requested destination conflicts with existing binding, obtain explicit keep/rebind/cancel decision
→ in non-interactive CLI compatibility flow, keep existing binding/no action-driven rebind on that conflict
→ freeze Prepared/Authorized Apply context
→ immediately before mutation revalidate selected Repository Target + prepared ChangeSet/binding assumptions + requested conversation/rebind safety when relevant
→ when chatContextToken is present, start/reuse its asynchronous bridge lookup without blocking Apply
→ verify configured Git repository identity
→ resolve/create/continue ChangeSet
→ verify path ownership / dirty-unowned boundary
→ verify exact expected bases
→ prepare rollback material
→ mutate
→ verify resulting bytes
→ record attempt + cumulative ReviewDiff
→ after successful Apply, execute any authorized legacy title bind/rebind; for chatContextToken, only evaluate whether its independently resolved binding is ready at the Review delivery cutoff
→ token resolved before cutoff: its immediate bind/rebind is already persisted; queue through normal SL-RPKG-06 to that destination
→ token pending/conflict at cutoff: keep Apply SUCCESS, skip this ReviewDiff auto-delivery, notify separately
→ late token resolution: immediately bind/rebind for future deliveries + notify separately; never retro-send the skipped ReviewDiff
```

No target file is changed before the complete package and all touched-path preconditions pass. The current stale-binding check protects the pre-mutation decision boundary only; it does not serialize a later manual Review-chat binding change made after background Execute has begun, which remains an accepted risk.

## 4. Error Codes

```text
SUCCESS
PACKAGE_INVALID
PACKAGE_NOT_FOUND
ACTION_PACKAGE_MISMATCH
REPOSITORY_MISMATCH
PATH_OWNERSHIP_CONFLICT
BASE_MISMATCH
RESULT_MISMATCH
STATE_DIVERGED
REVIEW_STALE
FINALIZE_FAILED
```

Errors are stable machine codes plus human-readable detail. Failed attempts remain local history whenever enough package/ChangeSet identity was resolved to record them.

## 5. Shared-Protocol Change Rule

A protocol change is complete only when:

1. this definition is updated;
2. the materialized use in `build-replacement-archive-workflow.md` is synchronized;
3. `.linked-notes/reference-objects.json` still routes the single definition/use correctly;
4. Core parser/validation and tests are updated;
5. the command ↔ app compatibility matrix in `scenarios/README.md` passes review.

## 6. Selected Target Source-State Semantics — Implementation Pending

The V0.1 shared literal above remains the **current executable producer/consumer contract** until the consumer implementation is updated and the Reference Object use is promoted in one synchronized change.

Selected target semantics do **not** change the ZIP schema/layout or which payloads exist:
- `add` still has no `base-files/<path>` and requires an absent/adoptable target;
- `replace/delete` still carry `base-files/<path>` as the producer's exact expected source content evidence;
- replacement payloads remain complete intended result bytes.

The selected consumer target changes only how a `replace/delete` expected base is proven against the current checkout:

```text
raw current bytes == base-files/<path>
→ expected source matches

otherwise
→ compare base content and current content through this repository/path's Git clean/filter semantics
→ Git-equivalent: expected source matches
→ different: source changed, block
→ cannot verify safely: block
```

This deliberately avoids naive global LF/CRLF normalization and supports continuation packages whose expected current content may be uncommitted ChangeSet work rather than `HEAD`.

Target user-facing result should describe `Source state changed` / `Source state could not be safely verified`; current `BASE_MISMATCH` may remain a compatibility/internal code while migrating.

### Promotion Rule

Do not change the active shared `obs-ref:def/use` literal to claim Git-equivalent source matching until:
1. Core/GitClient implementation and regression tests exist;
2. current consumer behavior passes raw/Git-equivalent/changed/unverifiable cases;
3. the canonical literal and producer materialized use are synchronized in the same documentation/application transition;
4. command/application compatibility review passes.

Until that promotion, package producers must continue supplying exact readable base payloads and must not rely on the unimplemented consumer fallback.
