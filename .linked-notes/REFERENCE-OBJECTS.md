# Reference Objects Repository Contract

This file defines the repository-facing rules for OBS Linked Notes Reference Objects. It is intended to be readable by humans, AI agents and tools without requiring knowledge of the userscript implementation.

Agent-facing feature status: **active**. Start from [`AGENT-GUIDE.md`](AGENT-GUIDE.md). For intentional direct repository creation or maintenance, use [`REFERENCE-OBJECTS-AUTHORING.md`](REFERENCE-OBJECTS-AUTHORING.md) as the procedure map; this file remains the canonical semantic/format contract.

## Core model

A Reference Object has:

- one stable object ID such as `ro_damage`;
- one mutable human-readable name stored in `.linked-notes/reference-objects.json`;
- exactly one definition marker containing the canonical literal value;
- zero or more `use` markers containing materialized literal copies of that value;
- zero or more `depend` markers delimiting repository fragments whose **semantic correctness** depends on that canonical value.

Marker syntax:

```text
<!-- obs-ref:def id="ro_damage" -->25<!-- /obs-ref:def -->
<!-- obs-ref:use id="ro_damage" -->25<!-- /obs-ref:use -->
<!-- obs-ref:depend id="ro_damage" dep="1" -->This conclusion depends on the current damage value.<!-- /obs-ref:depend -->
```

`dep` is a positive file-local dependency number. A given `dep` number identifies at most one live `obs-ref:depend` marker in one file, even when that file depends on several different Reference Objects. The durable dependency identity is therefore `path + dep`; `line` and `lineOccurrence` are only rebuildable navigation hints.

A `depend` fragment may contain ordinary text and `obs-ref:use` markers. `obs-ref:def` and nested `obs-ref:depend` markers are not allowed inside a dependency fragment. Marker-looking text inside fenced code blocks or inline code is example/code content, not a live Reference Object marker.

## Source of truth

The value inside the single `obs-ref:def` marker is canonical.

The value inside each `obs-ref:use` marker is a materialized copy. It is intentionally stored in Markdown so GitHub, readers and AI agents can see useful content without executing Linked Notes.

The inner content of `obs-ref:depend` is **not** a copy of the canonical value. It is independent derived/semantic content that must be reviewed if the source value changes.

`.linked-notes/reference-objects.json` stores routing/index metadata plus dependency review acknowledgements. It does not duplicate the canonical literal value.

### Ordinary consumption vs freshness verification

When a task only reads or consumes a current repository document, the materialized inner value of an existing `obs-ref:use` may be used directly. The presence of a use marker alone does not require proactive registry/definition traversal.

Resolve the canonical definition when:

- the task explicitly asks whether a use or dependent fragment is current;
- stale / needs-review / unresolved evidence is already known;
- a synchronized value or dependent fragment is being created or materially edited;
- a stale use is intentionally synchronized;
- a dependency review is being completed; or
- another operation depends on the canonical value rather than merely the materialized document state.

This does not make a use canonical. The definition remains the source of truth.

For normal `Check uses`, read the Definitions File, the recorded definition path and recorded use paths. For normal `Check dependencies`, read the Definitions File, the canonical definition path and the **indexed dependent-fragment paths only**. The check does not crawl unrelated repository content. `reviewedAgainst` records which canonical-value fingerprint was reviewed, while `reviewedFragment` records the exact bounded fragment content that was reviewed. A dependency is CURRENT only when its live marker resolves uniquely and both fingerprints still match.

`Validate tags` follows indexed definition/use/dependency routes and checks the markers it actually reads. Repository-wide discovery is a separate explicit integrity operation exposed as `Deep validate repo`.

## Finding an existing object

To resolve an existing Reference Object:

1. read `.linked-notes/reference-objects.json`;
2. find the object by stable `id` or human-readable `name`;
3. read `definition.path`;
4. find exactly one `obs-ref:def` marker with the same stable ID;
5. use its literal inner text as the current canonical value.

The display name may be renamed. The stable ID must not change merely because the name changes.

## Inserting a synchronized literal use

When a value in a new or edited file is intended to stay literally synchronized with an existing Reference Object, resolve the current definition and insert a complete use marker:

```text
Damage: <!-- obs-ref:use id="ro_damage" -->25<!-- /obs-ref:use -->
```

The inner value must initially equal the current definition value. Keep the marker when editing or formatting surrounding content.

If literal synchronization is not intended, ordinary plain text is correct and must not be wrapped merely because its value happens to equal a Reference Object.

Do not invent a new object ID to refer to an existing object.

## Adding a dependent fragment

Use `obs-ref:depend` only when a **bounded fragment's correctness must be reviewed after the Reference Object's canonical value changes**, but the fragment is not a literal copy of that value.

```text
<!-- obs-ref:depend id="ro_damage" dep="3" -->
At the current base damage, this enemy is intended to survive roughly four successful attacks.
<!-- /obs-ref:depend -->
```

Rules:

- choose an unused positive `dep` number within that file;
- register the dependency under the referenced object in `reference-objects.json`;
- `path + dep` must resolve to exactly one live dependency marker;
- initial creation is reviewed against the current definition and exact created fragment and may store both `reviewedAgainst` and `reviewedFragment`;
- manually pasted/unacknowledged dependencies may exist without either acknowledgement and are `NEEDS REVIEW`;
- never copy the definition fingerprint into the working Markdown marker;
- never auto-rewrite the dependent fragment because the definition changed.

Do **not** use `obs-ref:depend` merely to say two things are related. It represents an actual review obligation.

## Dependency fingerprint and status

A dependency review stores two derived fingerprints in the Definitions File:

```text
reviewedAgainst
= SHA-256 of the exact canonical obs-ref:def inner text

reviewedFragment
= SHA-256 of the exact bounded obs-ref:depend inner content
```

For each fingerprint: take the exact text without trimming, whitespace collapsing or line-ending normalization, encode UTF-8, compute SHA-256 and render `sha256:<64 lowercase hex>`. These fingerprints are derived metadata, never source of truth.

```text
live dependency marker missing / duplicated / invalid
→ UNRESOLVED

reviewedAgainst != current canonical-value fingerprint
→ NEEDS REVIEW

reviewedFragment != current dependent-fragment fingerprint
→ NEEDS REVIEW

both fingerprints match and the marker resolves uniquely
→ CURRENT
```

`Review complete` means a human/AI has actually read the current canonical value and the current bounded dependent fragment, changed the fragment if necessary, and determined it correct. Only then may the registry update **both** fingerprints.

If the fragment remains correct, completing review changes only Definitions File metadata; the consumer file should remain byte-for-byte unchanged.

## Changing the source value

When the canonical source is intentionally changed, edit only the inner text of the one `obs-ref:def` marker.

Two distinct downstream effects then exist:

```text
materialized uses
→ Check uses
→ stale uses may be explicitly replaced locally

semantic dependent fragments
→ Check dependencies
→ NEEDS REVIEW fragments must be reviewed
→ fragment content is edited only when the review finds it necessary
→ Review complete updates reviewedAgainst + reviewedFragment in the Definitions File
```

`Check uses` and `Check dependencies` are read-only checks. Neither acknowledges review or writes files.

There is no automatic/background propagation.

## Local-first publication

Reference Object definition/use/dependency/index changes use the common repository pending queue.

```text
local edit / Update uses locally / Review complete
→ pending complete-file state
→ Update current file OR Update all
```

`Update current file` may publish an independent pending path. However, if the Definitions File contains dependency acknowledgement state derived from a canonical definition that is itself pending, the Definitions File must not be published alone; use `Update all` so the definition and its review acknowledgement publish coherently.

## Definitions File

The current registry is `.linked-notes/reference-objects.json`, schema version **2**. Version 1 registries are readable as `depends: []`; current writes use version 2.

Each object stores:

```text
id
name
definition.path
uses[]:
  path
  line
  lineOccurrence
depends[]:
  dep
  path
  line
  lineOccurrence
  reviewedAgainst?   # canonical obs-ref:def exact-value sha256
  reviewedFragment?  # exact obs-ref:depend inner-content sha256
```

`uses[]` and dependency `line` / `lineOccurrence` are rebuildable navigation/index aids. The actual live markers in repository content are evidence that occurrences exist. Line metadata is not durable identity.

For dependencies, `path + dep` is the stable routing identity. `dep` is unique within its file across all Reference Objects.

When deliberate direct edits add/remove/move known uses or dependencies, keep the affected registry/index entries consistent. Preserve an existing dependency's review acknowledgement only when the same `path + dep` still denotes the same fragment **and its exact inner content still matches `reviewedFragment`**. If the bounded fragment changes, clear/invalidate the acknowledgement until semantic review is completed again. A new manually introduced dependency starts unacknowledged unless it was actually reviewed.

If registry/index and actual markers disagree and the correction is ambiguous, report/validate drift instead of guessing.

## Creating a new object outside the UI

Prefer Linked Notes `Create Reference Object` when available.

A deliberate direct repository creation requires:

1. choose a new unique stable `ro_*` ID;
2. wrap exactly one canonical source value with `obs-ref:def`;
3. add one matching object record to the Definitions File with name, definition path and initial `uses` / `depends` indexes;
4. do not create multiple definitions for the same ID;
5. validate before relying on it.

Do not create a new live object by adding only `use` or `depend` markers.

## Boundary with whole-file Review Dependencies

Reference Object relations and [`REVIEW-DEPENDENCIES.md`](REVIEW-DEPENDENCIES.md) solve different problems:

```text
obs-ref:use
Reference Object value → literal materialized copy

obs-ref:depend
Reference Object canonical value → bounded dependent fragment

obs-review:dependency
whole source file → whole consumer file
```

A generic semantic link with no freshness/review obligation is none of these.

## Validation expectations

Indexed `Validate tags` should detect malformed/unclosed markers, duplicate marker attributes, duplicate/missing definitions visible on routed paths, unknown use/dependency IDs, duplicate file-local dependency numbers, missing registered dependency markers and use/dependency index drift. `Deep validate repo` adds bounded repository-wide discovery for unindexed markers/definitions/dependencies.

Both validation modes are read-only unless a separate explicit repair/write action is requested.

Files diagnostics distinguish **stale literal uses** from **dependent fragments needing semantic review**. These statuses must not be collapsed because their correction workflows differ.
