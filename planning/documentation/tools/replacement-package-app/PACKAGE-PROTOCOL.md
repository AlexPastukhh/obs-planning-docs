# Replacement Package Protocol

Status: active current shared producer/consumer contract
Scope: package ZIP and OBS-ACTION protocol.

Producer owner: `planning/documentation/build-replacement-archive-workflow.md`

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
- `replace`: both payloads are required; `base-files/<path>` carries the producer's exact readable expected-source bytes and the consumer must prove that source state is still applicable before mutation;
- `delete`: base payload is required, replacement payload is absent, and the consumer must prove that source state is still applicable before mutation;
- for `replace` / `delete` source applicability, raw equality between current target bytes and the expected base passes immediately. Otherwise the consumer computes Git path-specific canonical identities for the expected and current byte streams using the exact target repository/path semantics; equal canonical identity passes, different identity is source changed, and Git/filter failure or other inability to prove equivalence fails closed. Do not replace this with global newline normalization or guessed text conversion;
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

## Consumer validation boundary

The consumer resolves a concrete ZIP, validates archive/manifest/path/payload identity, resolves the exact Repository Target and ChangeSet, verifies ownership/adoptability/source state for every touched path, and only then mutates. Source comparison is binary-safe and uses Git path semantics only after raw equality fails.
