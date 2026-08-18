# Documentation Workbench Planning Draft

Status: active current project-local Planning Draft / Planning Item ontology retired
Doc version: v1.6.0-current-owner-migration
Purpose: organize current Documentation Workbench planning meaning around the selected repository-native direction while preserving historical ITEM-* provenance without making Planning Item a current semantic layer.

Historical provenance source: [`planning-item-register.md`](planning-item-register.md)

## 1. Draft Identity

| Field | Value |
|---|---|
| Planning direction | Repository-native documentation links, affected-use review, categorized image-bearing Notes, repository search, rich Markdown and image-aware repository transfer |
| Status | selected current behavior / implementation candidates not selected |
| Historical provenance register | [`planning-item-register.md`](planning-item-register.md) |
| Historical inactive items | [`retired-planning-items.md`](retired-planning-items.md) |
| Previous route | [`full-picture.md`](full-picture.md) compatibility pointer |
| Selected planning depth | One current Planning Draft; historical ITEM-* IDs retained as provenance where useful |

## 2. Desired Result

Use ordinary repository Markdown, stable links, existing editors and Git review as the normal documentation workspace.

The selected solution should support:

```text
stable links to files and anchored fragments;
explicit Review Affected Uses behavior;
bounded non-mutating AI transfer copies;
durable linked Notes;
read-only in-app repository file viewing with exact GitHub navigation;
repository-backed file categories with explicit and implied memberships;
repository-owned Note images and image-aware Markdown transfer;
small independent helpers only where their value is proven.
```

Repository Markdown remains understandable and editable without a helper.

## 3. Acceptance Criteria

| ID | Criterion | Status | Historical provenance / evidence links |
|---|---|---|---|
| AC-01 | Complete durable documentation and Note meaning remains in repository Markdown. | accepted current | `ITEM-23B`, `ITEM-28B`, `ITEM-124` |
| AC-02 | A user can edit and review changes through an ordinary Git working-tree/diff workflow. | accepted current | `ITEM-34B` |
| AC-03 | Links can address complete repository files and stable anchored sections/fragments across folder nesting. | accepted current behavior / clarification pending | `ITEM-114` |
| AC-04 | A stable anchored link survives visible target-text changes and movement inside the same file when path/anchor identity remains valid. | confirmed user requirement / current-owner update pending review | `ITEM-114` |
| AC-05 | Dependency review is explicit and does not turn every navigation link into an obligation. | candidate / needs prototype | `ITEM-89`, `ITEM-105` |
| AC-06 | AI transfer expansion does not mutate saved Markdown and reports unresolved targets/cycles. | candidate / needs prototype | `ITEM-107` |
| AC-07 | A user can create a standalone Note and link it to files, stable fragments and other Notes. | confirmed user requirement / current-owner update pending review | `ITEM-124` |
| AC-08 | A remote Note save is not reported successful until the intended content is verified by reading it back. | implementation candidate / supported by supplied-script evidence | `ITEM-124`, pending Notes-widget Implementation Idea |
| AC-09 | No custom editor, generic object runtime, App Memory or Semantic Home is required by the baseline. | accepted current | current Planning Draft / workflow review |
| AC-10 | Retired and deferred meanings remain traceable. | accepted current | current and retired registers |
| AC-11 | A user can browse one repository directory at a time, read a supported file inside the helper and open the exact file on GitHub. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-126`, `ITEM-114` |
| AC-12 | A user can create durable category definitions with descriptions, assign files and reconstruct definitions/memberships from repository Markdown. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-97`, `ITEM-128`, `ITEM-23B` |
| AC-13 | Opening a category shows concrete files and distinguishes explicit from implied membership. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-118`, `ITEM-127` |
| AC-14 | Browsing and category refresh are read-only; category writes use conflict protection and exact read-back verification. | selected behavior / supported by automated prototype evidence | `ITEM-97`, `ITEM-126`, `ITEM-128` |
| AC-15 | Categories can be assigned to files and verified Linked Notes, including during Note creation/editing and category creation with multiple selected targets. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-97`, `ITEM-124`, `ITEM-128` |
| AC-16 | A shared target picker navigates/searches files and Notes by name, with bounded selectable file-search depth and persistent multiple selection. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-131`, `ITEM-124`, `ITEM-126` |
| AC-17 | Markdown files and Notes have rich sanitized views while literal Markdown remains available and canonical. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-124`, `ITEM-126`, `ITEM-132` |
| AC-18 | Repository-relative images and allowed `img` elements load through authenticated GitHub reads without exposing the token. | confirmed requirement / supported by automated evidence | `ITEM-132` |
| AC-19 | Failed actions display prominent contextual errors and preserve forms, Note text and selected targets. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-130` |
| AC-20 | Picker-created Note relations can be rebuilt from Note metadata and provide derived backlinks without target-side writes. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-124`, `ITEM-118`, `ITEM-133` |
| AC-21 | A user can paste or choose a supported image while editing a Note, preserve it as recoverable pending state, and save it as a verified repository asset referenced by portable Markdown. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-124`, `ITEM-132` |
| AC-22 | A verified Note can be copied into another same-repository Markdown file with repository images copied or safely reused and all relative image destinations rewritten and verified. | confirmed requirement / supported by `0.6.4-prototype` | `ITEM-134`, `ITEM-34B`, `ITEM-132` |

## 4. Boundaries And Non-Goals

### Included

- one current Planning Draft with historical ITEM-* provenance where useful;
- complete inline Key Scenarios;
- one Full Picture Matrix linking behavior, implementation and validation;
- ordinary Markdown/Git/GitHub/local-editor workflow;
- stable file/anchored-fragment/Note links;
- optional explicit review-on-change and include meaning;
- durable linked Notes, including explicitly inserted repository image assets;
- image-aware same-repository Note-to-Markdown transfer;
- read-only repository file browsing and exact GitHub links;
- durable file-category definitions, category views and explicit/implicit membership;
- proportional small-tool and prototype ideas;
- explicit diff review and permission boundaries.

### Excluded From Current Baseline

- monolithic Documentation Workbench application shell;
- custom Markdown editor;
- mandatory generic managed Reference Object runtime;
- App Memory as a canonical owner;
- Semantic Home and definition-location lifecycle;
- persisted full-text/bare managed-reference modes;
- automatic downstream semantic rewrites;
- automatic link repair;
- arbitrary character-range targets without stable identity;
- mandatory detailed project-local Scenario/DATA/Behavior artifacts;
- accepted Notes storage or credential architecture;
- arbitrary repository-file editing or universal binary rendering;
- recursive background repository indexing;
- selected file-local category marker syntax;
- category rename/delete and automatic link repair;
- automatic external-image import;
- destructive image move or orphan cleanup;
- cross-repository image-aware transfer in the first bounded prototype.

These exclusions do not erase deferred historical ideas.

## 5. Current Reality

The repository already provides reusable planning methodology, historical source-linked ITEM-* provenance, GitHub-readable Markdown and ordinary Git review/package workflows.

Current checked implementation evidence from the supplied ChatGPT Chats History userscript includes:

```text
Tampermonkey Shadow DOM panel;
IndexedDB local-first records;
manual records with role=note;
GitHub owner/repository/branch/path settings;
user-supplied token;
GitHub Contents API create/read/update behavior;
Markdown message anchors and linked annotations;
remote read-back verification;
SHA-aware retry/conflict handling.
```

That script does not yet prove a general Notes workspace, GitHub document picker, stable repository-fragment selection, Note-to-Note linking, remote Notes indexing or an accepted security boundary.

Current `0.6.4-prototype` implementation evidence retains the `0.5.1` workspace isolation, verified Note/category writes, target picker, rich Markdown and category behavior, and adds recoverable pending Note images, clipboard/file insertion, byte-preserving verified repository-asset writes, same-repository image-aware Note-to-Markdown transfer, full-plan target-path reservation, source-image freshness checks, raw code-like HTML exclusion, contextual retry actions and exact read-only recovery after unknown Markdown writes. Source Notes and source images are preserved; external images are not downloaded automatically; target assets are copied or safely reused and relative destinations are rewritten. Category definitions remain the sole selected prototype owner of category membership; Note metadata owns only picker-created managed links. Rendered HTML, backlinks, pending previews, search results and local caches remain derived. Automated tests do not replace pending browser and real-GitHub acceptance.

The former detailed Scenario workspace is no longer selected. Its useful current meaning is represented below and by current workflow/Planning Draft owners; historical ITEM-* references remain provenance only. The complete project-local `scenarios/**` workspace is removed; Git history preserves its former detail.

The former reference-link experiment is removed without a replacement owner. Standard Markdown navigation remains checked current capability; dependency invalidation and AI expansion still require prototypes.

## 6. Historical Planning Source Boundary

`ITEM-*` references below are retained for provenance/history and do not imply that Planning Item remains a canonical current entity. New answer-seeking work uses the shared Idea methodology; current decisions/requirements remain owned by this Planning Draft, current workflows and current application documentation.

## 6.1 Historical Planning Source Map

| Group | Historical ITEM-* provenance | Role |
|---|---|---|
| Repository-native foundation | `ITEM-28B`, `ITEM-23B`, `ITEM-34B` | durable workspace and change flow |
| Stable references | `ITEM-114`, `ITEM-105`, `ITEM-89` | navigation, optional metadata and affected-use review |
| Planning lifecycle | `ITEM-98`, `ITEM-99` | planning-to-repository and Implementation Idea boundary |
| Early delivery | `ITEM-100` | select one small useful tool before broad architecture |
| AI transfer | `ITEM-107` | non-mutating bounded expansion |
| Linked Notes | `ITEM-124`, `ITEM-130`, `ITEM-131`, `ITEM-133` | durable Notes, target selection, recoverable links and contextual failure behavior |
| Image-aware repository transfer | `ITEM-134`, `ITEM-34B`, `ITEM-132` | copy visible Note Markdown with verified repository assets and rewritten image paths |
| Repository file viewer | `ITEM-126`, `ITEM-114`, `ITEM-131`, `ITEM-132` | bounded search, source/rich view, exact targets and authorized images |
| Repository file and Note categories | `ITEM-97`, `ITEM-118`, `ITEM-127` | durable typed memberships, category views and grouping/implication semantics |
| Category and rendering implementation ideas | `ITEM-128`, `ITEM-129`, `ITEM-132`, `ITEM-133` | selected definition, renderer and relation-metadata prototypes; deferred file-local metadata |
| Independent supporting capabilities | `ITEM-121`, `ITEM-123` | composer and project-readable non-secret configuration |
| Reusable planning support | `ITEM-94`, `ITEM-110`, `ITEM-41`, `ITEM-112`, `ITEM-113`, `ITEM-119`, `ITEM-120`, `ITEM-122` | reusable methodology and traceability |
| Deferred alternatives | see current register | preserved but not selected |
| Retired meanings | [`retired-planning-items.md`](retired-planning-items.md) | historical trace only |

Historical provenance for the repository-file/category transformation includes `ITEM-97`, `ITEM-118` and `ITEM-126` through `ITEM-129`. Current semantics are owned by the current Planning Draft, current workflows and Linked Notes application owners. Repository Category Definition Markdown remains selected only as bounded prototype evidence; file-local category metadata remains deferred.

## 7. Key Scenarios

The seven Scenarios below are current Key Scenarios because they own core value, differentiation or material implementation/validation risk. They are fully described inline so separate project-local Scenario files are unnecessary.

### 7.1 Create And Navigate Stable File/Fragment Links

**Why key:** stable repository navigation is the foundation for affected-use review, AI transfer and Note links.

**Actor/context:** a user or contributor works with Markdown files located at different paths and nesting depths in the same Git repository.

**Goal:** create a portable link to a complete file or stable anchored fragment and open the intended target later after normal document edits.

**Observable result:** the link opens the intended file/fragment, or shows an explicit broken/unresolved result.

**Important Scenario DATA:**

- source repository path;
- target repository file path or Note identity;
- explicit anchor identity when a fragment/section is targeted;
- relation meaning kept separately from target identity;
- resolved, broken or unresolved target state.

**Entry / preconditions:**

- source and target are inside the selected repository, or the external target has a portable URL;
- a fragment target has a stable explicit anchor;
- the current source file path is known.

**Main flow:**

1. The user selects a target: complete Markdown file, stable anchored section/fragment or repository Note.
2. The user creates an ordinary Markdown link from the current source.
3. The link path is resolved relative to the source file and may traverse parent, sibling or deeper folders.
4. The user opens the link.
5. The target resolves to the intended file/anchor identity.
6. Later, visible content inside or around the target changes.
7. The target may move to another position inside the same file while retaining its anchor.
8. The original link continues to resolve when file path and anchor identity remain valid.

**Branches / alternatives / failures:**

- complete-file link has no fragment component;
- source and target are in the same folder;
- target is in a parent, sibling or nested folder;
- visible heading text changes but an explicit anchor stays unchanged;
- file path changes: link must be updated or becomes unresolved;
- anchor is renamed/removed: link must be updated or remains visibly broken;
- arbitrary text has no stable anchor: it is not treated as a durable target;
- a normal link remains navigation-only unless explicit adjacent relation meaning exists.

**Invariants / acceptance / outcomes:**

- link identity is separate from relation meaning;
- content changes do not break an unchanged explicit anchor;
- unresolved targets are not silently rebound to similar text;
- repository Markdown remains useful without a helper;
- machine-local absolute paths are not portable repository targets.

**Questions / risks / evidence needs:**

- exact stable-anchor convention and validation;
- rename/move assistance without silent repair;
- cross-platform relative-path handling;
- whether Note identities use file paths, explicit anchors or both.

**Historical ITEM-* provenance:** `ITEM-114`, `ITEM-105`, `ITEM-23B`, `ITEM-124`.

**Implementation Ideas:** standard Markdown path/anchor handling plus an optional link/anchor validator or creation helper; association only, no helper architecture accepted.

### 7.2 Review Affected Uses

**Why key:** the primary missing behavior is knowing which explicitly dependent uses require human review after a target changes.

**Actor/context:** a contributor changes a file, stable section/fragment or Note that has one or more explicitly marked review-on-change uses.

**Goal:** discover every affected use and give it a clear human disposition.

**Observable result:** every discovered use is confirmed current, updated, removed/replaced or explicitly unresolved.

**Important Scenario DATA:**

- changed target identity, file path and optional anchor;
- explicit review-on-change relation;
- affected use-site path and optional anchor;
- target-change and use-context evidence shown for review;
- review disposition: confirm, update, remove/replace or unresolved.

**Entry / preconditions:**

- the changed target has stable identity;
- review obligations are expressed separately from ordinary navigation links;
- the changed target and candidate use sites are readable.

**Main flow:**

1. The target changes.
2. A helper or review process identifies uses carrying explicit review-on-change meaning.
3. For each use, the user sees target-change context and dependent-use context.
4. The user reviews whether the use is still accurate.
5. The user confirms it, updates it, removes/replaces the relation or leaves it unresolved.
6. The review result remains visible until resolved.

**Branches / alternatives / failures:**

- ordinary navigation-only link: no review obligation;
- ambiguous/malformed metadata: do not infer dependency;
- missing target/use: show unresolved record;
- one changed target affects several files/Notes;
- one use references several changed targets;
- no helper exists: manual review remains possible, but the missing automation is still observable.

**Invariants / acceptance / outcomes:**

- no automatic semantic rewrite;
- no false obligations for plain links;
- affected source and use locations are visible;
- each explicit obligation receives a disposition;
- dependency-only bookkeeping files may be retired only after equivalent discovery is proven.

**Questions / risks / evidence needs:**

- exact adjacent metadata syntax;
- changed-target detection and Git diff input;
- false-positive/false-negative behavior;
- status persistence without a broad runtime;
- minimum Reference Impact Checker prototype.

**Historical ITEM-* provenance:** `ITEM-89`, `ITEM-105`, `ITEM-114`, `ITEM-100`.

**Implementation Ideas:** Reference Impact Checker; relation-backed prototype association only, not accepted implementation.

### 7.3 Produce AI Transfer Copy

**Why key:** AI work sometimes needs linked context expanded without mutating canonical repository Markdown.

**Actor/context:** a user selects a Markdown file, stable section/fragment or Note for transfer to an AI conversation.

**Goal:** create a separate bounded copy containing only explicitly includable linked content.

**Observable result:** one temporary expanded copy with source identities, boundaries and visible unresolved/cycle results; repository Markdown is unchanged.

**Important Scenario DATA:**

- selected source file, anchored fragment or Note identity;
- explicit include-relation set;
- expansion depth, size and repeated-target bounds;
- source path/anchor boundaries in the transfer copy;
- unresolved-target, cycle and bounded-stop results.

**Entry / preconditions:**

- selected source exists;
- include relations are explicit and separate from ordinary navigation/review meaning;
- expansion limits are defined.

**Main flow:**

1. The user selects a file/fragment/Note.
2. The operation reads its current Markdown.
3. It resolves only links carrying explicit include meaning.
4. It inserts selected linked content into a separate transfer representation.
5. It records source path/anchor boundaries.
6. It stops at configured depth/size limits.
7. It reports unresolved targets and cycles.
8. It returns the temporary copy without modifying any source file.

**Branches / alternatives / failures:**

- no include relations: return selected source unchanged as the transfer copy;
- unresolved include: preserve a visible unresolved marker;
- recursive cycle: stop and report cycle;
- repeated target: apply deduplication/expansion policy explicitly;
- oversized expansion: stop or omit according to configured bound;
- navigation-only/review-only relation: do not expand automatically.

**Invariants / acceptance / outcomes:**

- saved Markdown is never mutated;
- only explicit include relations expand;
- source identity remains visible;
- recursion is bounded;
- incomplete expansion is explicit rather than silently truncated.

**Questions / risks / evidence needs:**

- exact include metadata syntax;
- section extraction boundaries;
- depth/size/cycle policy;
- output format for AI transfer;
- minimum AI Transfer Expander prototype.

**Historical ITEM-* provenance:** `ITEM-107`, `ITEM-105`, `ITEM-114`, `ITEM-100`.

**Implementation Ideas:** AI Transfer Expander; relation-backed prototype association only, not accepted implementation.

### 7.4 Create, Link And Manage Repository Notes

**Why key:** Notes are an independently useful workflow and a concrete candidate for the first user-facing helper.

**Actor/context:** a user opens a Notes widget/workspace while working with ChatGPT or repository documentation.

**Goal:** create, read or edit a Note, link it to repository documentation or other Notes, reconcile external repository changes without losing local work and preserve the Note durably in GitHub/repository Markdown.

**Observable result:** a local or repository-existing Note is available in the Notes list/search, has working links and a visible local/remote reconciliation state, and is verified in repository storage after an explicit save; otherwise its local-only, unresolved, conflict, deleted or failure state is explicit.

**Important Scenario DATA:**

- stable Note identity;
- optional title and literal Markdown body;
- links to repository files, explicit anchors, Notes and optional chat messages;
- local draft, changed-after-save and durable-remote state;
- repository owner/repository/branch/path target;
- selected repository Notes location/workspace;
- remote snapshot path/SHA/content hash and last verified base;
- remote-only, local-ahead, remote-changed, both-changed, duplicate-identity or remote-deleted state;
- remote refresh summary or equivalent visible result;
- remote read-back verification state and unresolved-link state.

**Entry / preconditions:**

- Notes work surface is available;
- local working state can be stored;
- repository configuration is known for remote operations;
- credentials are available only when required for remote access.

**Main flow:**

1. The user creates a standalone Note or opens an existing Note.
2. The user optionally sets a title and edits the body.
3. The user adds zero or more links to complete files, stable anchored fragments or other Notes.
4. The widget resolves targets where possible and shows unresolved targets.
5. The widget saves recoverable local working state.
6. When the user explicitly requests repository reading, the widget reads the selected Notes location and identifies valid repository Notes.
7. It compares repository identity, target and content with local working state and the last verified base.
8. It imports a repository-only Note, fast-forwards an unchanged local copy, preserves local-ahead content or exposes conflict/deletion/unsupported/incomplete results without performing a repository write.
9. The user explicitly requests a repository save/update when durable remote persistence is needed.
10. The widget reads the current remote/base state.
11. It creates or updates portable Markdown through GitHub/repository integration.
12. It reads the remote target back and verifies the expected content.
13. It refreshes the Note list/search/index.
14. The user opens the Note or one of its linked targets.

**Branches / alternatives / failures:**

- standalone Note with no links;
- local-only unsaved draft;
- repository Notes location does not exist yet;
- valid repository-only Note;
- ordinary or unsupported Markdown in the selected location;
- remote changed while local still equals the verified base;
- local changed while remote still equals the verified base;
- local and remote changed differently;
- bound remote file deleted;
- duplicate stable Note identity or conflicting path binding;
- inaccessible repository/branch/location;
- bounded repository scan cannot complete;
- missing file/anchor/Note target;
- Note-to-Note cycle;
- missing/invalid token;
- insufficient GitHub permission;
- remote SHA conflict;
- network result unknown after a write;
- local content changed after save;
- link is navigation-only or separately marked review-on-change.

**Invariants / acceptance / outcomes:**

- Note body remains ordinary Markdown;
- token/secret is never written into Note or repository content;
- local working state is not confused with durable repository truth;
- repository refresh is explicit and does not perform a remote write;
- remote-only content fast-forwards local state only when local content still equals the verified base;
- local-ahead work is preserved and different two-sided changes are not silently merged;
- remote deletion does not delete local working state;
- remote save is verified by read-back;
- one Note identity is not duplicated merely because several views or repository paths display it;
- unresolved links remain visible;
- a helper does not silently become canonical owner.

**Questions / risks / evidence needs:**

- separate Notes userscript versus extension of Chat History;
- file-per-Note/shared-file/hybrid persistence;
- lightweight Note identity versus generic object projection;
- local-first/GitHub-required boundary;
- index derivation, repository discovery bounds and stale-cache behavior;
- whether recursive Notes-location reading is ever needed;
- fine-grained token permissions/storage;
- rename/delete and cycle behavior;
- minimum Notes prototype described in the Notes workflow.

**Historical ITEM-* provenance:** `ITEM-124`, `ITEM-114`, `ITEM-23B`, `ITEM-99`, `ITEM-100`, `ITEM-123`; proposed Notes-widget Implementation Idea pending explicit current-owner / Idea review.

**Implementation Ideas:** proposed Tampermonkey Linked Notes And GitHub Widget, with the supplied Chat History script as partial evidence; association only, with userscript, storage and credential design still open.


### 7.5 Browse Repository Files And Manage Categories

**Why key:** repository reading and durable file classification are independently useful and provide the navigation surface required by Notes and later documentation tooling.

**Actor/context:** a user is working in one configured GitHub workspace and needs to inspect repository files or organize them by reusable categories.

**Goal:** browse repository paths, read a supported file without leaving the application, retain an exact GitHub escape hatch, create durable categories, assign files and navigate explicit or implied category memberships.

**Observable result:** the selected file is shown read-only or with an explicit unsupported/oversized state and exact GitHub link; category definitions and membership views are reconstructed from repository Markdown; explicit category writes are conflict-protected and verified, or a visible recoverable failure is shown.

**Important Scenario DATA:**

- workspace owner/repository/branch;
- current directory, breadcrumbs and direct entries;
- selected file path, SHA, size, preview kind and GitHub URL;
- configured Categories folder;
- stable category ID, name and literal Markdown description;
- category-definition path/SHA;
- implied-category links and explicit file links;
- explicit/derived membership provenance;
- local-only category group;
- broken link, duplicate ID, cycle, conflict and verification states.

**Entry / preconditions:**

- a GitHub workspace and existing branch are configured;
- a credential is available when repository access requires it;
- remote operations are explicit;
- local category cache is rebuildable and is not repository truth.

**Main flow:**

1. The user opens Files and explicitly reads the repository root or another directory.
2. The helper validates and displays sorted direct entries and breadcrumbs.
3. The user opens a file.
4. A supported bounded text file is shown literally and read-only; otherwise metadata and a clear preview limitation are shown.
5. The helper retains an exact `Open on GitHub` URL for the selected owner/repository/branch/path.
6. The user opens Categories and explicitly refreshes the configured category-definition location.
7. The helper decodes valid definitions and rebuilds category and membership views.
8. The user may create a category, edit its description or select implied categories.
9. The user may assign or unassign a selected repository file.
10. The helper reads the current definition, creates or updates it with SHA protection, reads the result back and verifies exact content.
11. The user opens a category and sees its description plus concrete files marked as explicit or implied.
12. Broken, duplicate, cyclic, conflicting or inaccessible states remain visible and recoverable.

**Branches / alternatives / failures:**

- empty repository directory;
- supported text preview;
- binary, unsupported or oversized file;
- file deleted between listing and read;
- inaccessible repository or branch;
- missing Categories folder before the first definition;
- ordinary Markdown in the Categories folder;
- malformed category definition;
- duplicate stable category ID;
- broken file or implied-category link;
- category implication cycle;
- remote definition changed after refresh;
- uncertain write/read-back result;
- local-only category group change.

**Invariants:**

- browsing, preview and category refresh perform no remote write;
- every selected file retains exact repository identity and GitHub navigation;
- supported content is read-only in the viewer;
- category definitions remain ordinary repository Markdown;
- explicit membership and implied membership are visibly distinct;
- a UI group does not imply file membership;
- a category write is not successful before exact read-back verification;
- unresolved implication links survive unrelated category edits;
- target files are not modified by category assignment in the selected prototype;
- local category cache may be discarded and rebuilt;
- token/secret never enters repository content.

**Questions / risks / evidence needs:**

- final category definition syntax and location convention;
- preview format and size coverage;
- category rename/delete and incoming-link repair;
- whether file-local metadata ever provides enough value to justify duplicate representation;
- transitive implication UX and cycle recovery;
- recursive browsing/indexing bounds;
- private-repository permissions and token lifecycle;
- real-GitHub create/assign/rebuild/conflict evidence.

**Historical ITEM-* provenance:** `ITEM-97`, `ITEM-118`, `ITEM-126`, `ITEM-127`, `ITEM-128`, `ITEM-129`, `ITEM-23B`, `ITEM-114`, `ITEM-123`.

**Implementation Ideas:** `ITEM-128 / CATEGORY-DEFINITION-MARKDOWN` is selected for the bounded prototype; `ITEM-129 / FILE-LOCAL-CATEGORY-METADATA` remains deferred and is not written into target files.


### 7.6 Select Targets, Render Markdown And Recover Managed Relations

**Why key:** category assignment and Note linking need one reliable target-selection path, while rich reading and visible recovery are core to using repository Markdown inside the helper.

**Actor/context:** a user creates or edits a Note/category, searches a deep repository tree, selects several files or Notes, renders Markdown containing private repository images, or recovers after a failed remote action.

**Goal:** select exact same-repository targets without typing paths, retain all input through failure, create visible Markdown links plus recoverable managed metadata, and read files/Notes through a safe rich projection.

**Observable result:** bounded search reports its depth and incompleteness; selected targets survive rerenders/errors; verified category definitions distinguish file and Note membership; managed Note links and backlinks rebuild from repository Notes; private images load via authenticated reads without token disclosure; raw source remains available.

**Invariants:**

- no search, preview or rendering action performs a remote write;
- category membership remains canonical in category definitions;
- managed Note relation identity remains in Note metadata and visible navigation remains Markdown;
- rendered HTML is derived and sanitized;
- unsafe HTML/URL schemes and external automatic image loading are blocked;
- partial multi-file results remain explicit and retryable;
- errors do not clear user input.

**Historical ITEM-* provenance:** `ITEM-97`, `ITEM-118`, `ITEM-124`, `ITEM-126`, `ITEM-130`, `ITEM-131`, `ITEM-132`, `ITEM-133`.


### 7.7 Insert Note Images And Copy A Note With Its Assets

**Why key:** image-bearing Notes are not portable when the Markdown moves but its image files do not. Image insertion and transfer therefore require explicit asset ownership, path rewriting, verification and partial-result behavior.

**Actor/context:** a user pastes or selects an image while editing a Note, or copies a verified repository-backed Note into another Markdown file in the same repository and branch.

**Goal:** save inserted images as ordinary repository files and copy a Note together with repository-backed images so the resulting target Markdown renders without broken image destinations.

**Observable result:** pending images survive local failure/reload, explicit Note save verifies both image bytes and final Markdown, and image-aware transfer copies or reuses assets under a target-owned asset folder, rewrites destinations and verifies the target file.

**Main flow:**

1. Insert a supported image by clipboard or file selection.
2. Keep bytes, alt text and insertion position as local pending state without a remote write.
3. On explicit Note save, validate the exact Note repository context and destination paths.
4. Create or safely reuse repository image assets and verify their bytes.
5. Replace pending references with portable repository-relative Markdown and verify the Note.
6. For transfer, choose a target Markdown path and create/append mode in the same owner/repository/branch.
7. Discover repository-backed Markdown images and allowlisted `img` sources in the visible Note content.
8. Copy or reuse assets in `<target-name>.assets/`, rewrite all relative destinations and verify the target Markdown.
9. Report complete or explicit partial state without deleting source files or pretending multi-file atomicity.

**Invariants:**

- source Note and source images are not deleted;
- external images are preserved but not downloaded automatically;
- token, object URLs and local machine paths never enter repository Markdown;
- unknown destination files are never overwritten silently;
- successful image writes are reused after a later Markdown conflict rather than blindly duplicated or rolled back;
- transfer excludes quiet Linked Note metadata and copies visible title/body only;
- every remote write is explicit, conflict-aware and read-back verified.

**Historical ITEM-* provenance:** `ITEM-124`, `ITEM-134`, `ITEM-132`, `ITEM-130`, `ITEM-34B`, `ITEM-114`.

## 8. Other Scenarios — Optional Summaries

| Scenario | Actor/context | Goal | Observable result | Related items | Depth |
|---|---|---|---|---|---|
| Structure a complex source message | user preparing long input | preserve literal meaning while making fragments addressable | one usable ordinary message | `ITEM-121`, `ITEM-122` | supporting summary |
| Change a helper convention | maintainer changes a non-secret tool value | keep configuration controlled and readable | validated project-readable configuration | `ITEM-123` | supporting summary |

Planning commands, item reconciliation and repository package mechanics are development infrastructure. They are not product Key Scenarios of the planned documentation/link/Notes solution.

## 9. Full Picture Matrix

This table is the required current cross-view structure inside this Planning Draft. It is a view, not a separate canonical artifact. Complete item/idea/question bodies remain at their owners.

| Flow point / Scenario | Scenario meaning | Implementation meaning | Questions / risks / tests / evidence | Status / next action |
|---|---|---|---|---|
| Select a stable target | file, explicit anchored fragment or Note | standard Markdown path + explicit anchor | anchor convention; path portability | current baseline; define prototype fixtures |
| Create link across folder nesting | same/parent/sibling/deeper path resolves | existing editor or optional link helper | Windows/URL encoding; moved file | test representative repository layout |
| Change target content/location | link survives when path/anchor identity survives | anchor validator idea | rename/delete behavior | needs link-survival tests |
| Review Affected Uses | explicit obligations discovered and dispositioned | Reference Impact Checker Implementation Idea | marker syntax; Git diff input; false positives/negatives | Working / Needs Prototype |
| Produce AI Transfer Copy | explicit includes expand into separate bounded copy | AI Transfer Expander Implementation Idea | recursion, cycles, source boundaries, size | Working / Needs Prototype |
| Create/edit Note | standalone/titled/untitled durable Markdown Note | Notes widget candidate; local IndexedDB working state | minimum Note fields; recovery | behavior selected; implementation review pending |
| Link Note to file/fragment | link resolves to GitHub/repository documentation | repository browser/path+anchor picker | private repo access; anchor identity | prototype required |
| Link Note to Note | stable Note target opens | Note identity/index candidate | cycles, rename/delete, storage layout | prototype required |
| Read/reconcile repository Notes | explicit refresh makes valid repository-only Notes and external changes visible without losing local work | bounded read-only Notes-location scan + stable-id/base comparison | discovery bounds; duplicate identity; stale snapshot; no background write | supported by `0.3.0-prototype`; browser/remote acceptance pending |
| Save Note remotely | explicit write followed by read-back verification | GitHub Contents API + SHA-aware update | token scope/storage; conflicts; unknown network result | partially supported by supplied-script evidence |
| Browse Notes | list/search/index reaches concrete Notes | local derived index or GitHub-derived index | stale cache; one-file/shared-file tradeoff | prototype evidence; final indexing open |
| Browse repository files | direct folders and supported files open read-only with exact GitHub navigation | Contents API directory reads + bounded preview | binary/large files; private access; no background reads | supported by `0.6.4-prototype`; browser acceptance pending |
| Refresh category definitions | repository Markdown reconstructs definitions and memberships | category codec + workspace cache/index | malformed/duplicate/broken/cycle states | supported by `0.6.4-prototype`; remote acceptance pending |
| Create/edit category | description and implication links persist durably | verified category definition write | stale SHA; uncertain network result; syntax evolution | supported by automated prototype evidence |
| Assign/unassign file | category definition owns portable file link | relative-link generation + verified update | moved files; broken links; rename/delete | supported by automated prototype evidence |
| Open category | explicit and implied files are concrete navigable results | derived category index and view | transitive scope and provenance clarity | supported by `0.6.4-prototype` |
| Insert image into Note | clipboard/file image becomes pending local state and then a portable verified repository asset | pending asset store + binary Contents API verification + Note rewrite | MIME/size, reload recovery, partial asset/Note failure | supported by `0.6.4-prototype`; browser/remote acceptance pending |
| Copy Note with images | visible Note Markdown and repository images become a verified target document and target-owned assets | transfer planner + collision-safe asset writer + rewritten relative paths | non-atomic writes, collisions, missing/external images, target SHA conflict | supported by `0.6.4-prototype`; browser/remote acceptance pending |
| Repository diff review | durable Markdown changes remain reviewable | normal Git working tree/package flow | exact base and permission boundary | existing accepted workflow |

## 10. Existing Solutions And Alternatives

| Option | Current disposition | Reason / evidence need |
|---|---|---|
| Existing editor + Markdown/Git only | baseline | lowest maintenance; sufficient where links/search are enough |
| Existing editor + small local scripts/CLI | preferred candidate for impact/transfer | adds missing behavior proportionally |
| Separate Tampermonkey Notes userscript | current Notes prototype candidate | narrow independent workflow; avoids coupling to command palette |
| Extend supplied Chat History userscript | open alternative | reuses proven local/GitHub patterns but risks product coupling |
| Shared small browser/GitHub library + separate widgets | open alternative | reuse without one monolithic UI; requires module strategy |
| GitHub Action or hosted integration | later alternative | remote availability, permissions, latency and security costs |
| Generic Reference Object runtime/category projection | deferred alternative | broader than current proved need |
| Monolithic custom Workbench | deferred alternative | high coordination and maintenance cost before helpers are proven |
| No new tool for a capability | valid | use whenever existing Markdown/search/review is sufficient |

## 11. Implementation Ideas And Evidence

| Idea | Historical provenance / current target | Status | Minimum prototype/evidence |
|---|---|---|---|
| Reference Impact Checker | `ITEM-89` | Working / Needs Prototype | scan explicit review relations for changed stable targets and list affected uses without false navigation obligations |
| AI Transfer Expander | `ITEM-107` | Working / Needs Prototype | expand explicit includes into a bounded non-mutating sourced copy |
| Structured Message Composer | historical `ITEM-121` provenance | retired as an independent current Use Case; ordinary source structuring remains valid input behavior | preserve literal text and addressable structure when useful without a separate Planning Item layer |
| Tampermonkey Linked Notes And GitHub Widget | `ITEM-124` | Working / Needs Browser And Remote Acceptance | create/open/edit linked Notes; explicit repository refresh and safe reconciliation; verified GitHub persistence; file/anchor/Note navigation |
| Repository Category Definition Markdown | `ITEM-97`, `ITEM-118`, `ITEM-127`; `ITEM-128` | selected bounded prototype | create/edit definitions, rebuild cache, explicit/implied views, conflicts and cycles |
| File-Local Category Metadata | `ITEM-97`; `ITEM-129` | deferred | prove value and select precedence without creating duplicate truth |
| Pending Note Images And Verified Asset Writes | `ITEM-124` | selected bounded prototype | clipboard/file insertion, IndexedDB recovery, byte-exact GitHub save and Note read-back |
| Image-Aware Repository Markdown Transfer | `ITEM-134` | selected bounded prototype | same-repository create/append, asset copy/reuse, path rewrite, conflict and partial-result evidence |

### Supplied userscript evidence

The supplied ChatGPT Chats History userscript is an example and evidence source, not an owner. It supports feasibility of:

- Shadow DOM widget UI;
- IndexedDB local records and review states;
- manual Note-like records;
- configurable GitHub target;
- GitHub Contents API writes with a token;
- exact Markdown anchors and links;
- remote read-back verification;
- retry/conflict-aware behavior.

It does not accept the choice to extend that script or prove the full Notes scenario.

Current `0.6.4-prototype` evidence additionally covers explicit GET-only Notes refresh, repository browsing/search, rich Markdown, category definitions, managed relations, recoverable pending image insertion, byte-verified repository image writes and same-repository image-aware Note transfer. Automated tests do not replace the pending browser and real-GitHub run.

## 12. Questions, Risks And Decisions

### Prioritized questions

| Priority | Question | Conservative fallback |
|---:|---|---|
| 1 | What is the final category-definition syntax and discovery location? | retain one configurable Categories folder and one ordinary Markdown definition per category for prototype evidence only |
| 2 | Should explicit membership ever also be written into target files? | keep category definition as the single selected prototype owner; keep file-local category metadata deferred (`ITEM-129` is historical provenance only) |
| 3 | How should category rename/delete repair incoming definition and file links? | exclude rename/delete; show unresolved links rather than silently repairing them |
| 4 | Which file formats receive in-app preview? | bounded UTF-8/text preview; metadata plus GitHub link for unsupported/binary/oversized content |
| 5 | How are semantic implications and local UI groups presented? | keep them separate and label explicit versus derived membership |
| 6 | How is the GitHub token handled? | local-only fine-grained least-privilege credential; never repository content |
| 7 | Which remaining helper is implemented next? | require an independently useful acceptance result before expanding the application |
| 8 | Should image-aware transfer later support another repository or branch? | keep the first bounded prototype in the exact source owner/repository/branch |
| 9 | Should orphan assets be removed automatically after partial failure? | never delete automatically; expose a cleanup candidate separately |

### Risks

- hidden metadata may become hard to maintain;
- anchors may be renamed without validation;
- a small helper may expand into a new platform;
- GitHub-specific behavior may reduce local portability;
- token persistence may create security exposure;
- local/remote state may be confused;
- a bounded repository snapshot may be mistaken for a complete index;
- duplicate Note identity or path binding may require explicit recovery UX;
- Notes storage layout may create avoidable write conflicts;
- generic Reference Object logic may reintroduce deferred architecture prematurely;
- category definitions may become a second source of truth if file-local metadata is later added without a precedence rule;
- category implication cycles or broken links may make derived membership incomplete;
- broad repository browsing may create excessive API calls if it silently becomes recursive;
- the userscript may expand beyond a maintainable narrow helper before browser evidence is collected;
- a multi-file image save or transfer can leave verified assets before the final Markdown write succeeds;
- copied assets can become redundant because automatic orphan cleanup is intentionally excluded.

### Decisions

- Planning Draft is the sole active high-level owner.
- The five core Scenarios are complete inline Key Scenarios.
- One Full Picture Matrix is the selected cross-view structure.
- Former project-local detailed Scenario/DATA/Behavior files are not selected.
- Existing app-heavy architecture remains deferred, not silently erased.
- Repository Markdown remains durable truth.
- Notes are an independently useful behavior/workflow.
- Repository-owned image insertion is part of Note authoring, while Note-to-Markdown asset transfer is a separate independently traversable workflow.
- Image transfer copies rather than moves source assets, is same-repository/branch in the first prototype and does not auto-download external images.
- Explicit repository reading and safe local/remote reconciliation are required Note-workflow behavior; exact scan depth and resource limits remain implementation choices.
- No specific Notes storage layout or credential design is accepted by this Draft alone.
- Repository file viewing and repository-backed file categories are accepted requirements.
- Repository Category Definition Markdown is selected only as the bounded `0.6.4-prototype` implementation idea; historical provenance includes `ITEM-128`; it is not final production architecture.
- Category definitions own prototype explicit membership; file-local category metadata remains deferred (historical provenance: `ITEM-129`).
- Category groups are local UI organization; category implications are repository-backed classification relations.

## 13. Selected Planning Depth

| Layer | Selection | Current form | Reason |
|---|---|---|---|
| Historical ITEM-* records | provenance only | historical register | preserve source/history without current ontology |
| Planning Draft | yes | this file | one high-level coordination owner |
| Key Scenarios | complete inline | seven sections above | sufficient current behavior/risk depth |
| Other Scenarios | optional summaries | section 8 | avoid unnecessary deep workspace |
| Full Picture Matrix | yes | section 9 | required behavior/implementation/validation link view |
| Detailed project-local Scenario/DATA/Behavior | no | removed; Git history preserves prior files | coordination cost not justified |
| Reusable SDS profile | available but inactive | reusable profile | can be selected for another project/need |
| Domain | no | none | no separate model needed yet |
| Slice | prototype only | Linked Notes `0.6.4-prototype` | evidence-producing implementation; production slice not selected |
| Prototype detail | only for selected helper | current Idea/Draft questions or later separate artifact | evidence before architecture |

## 14. Scenario Coverage Audit Result

The former local deep-planning workspace is classified as follows:

```text
SCN-DW-01..04:
  planning-development infrastructure;
  covered by reusable planning workflows and current Planning Draft route;
  not product Key Scenarios;

SCN-DW-05, 07, 08, 12:
  useful repository/link behavior absorbed into
  Create And Navigate Stable File/Fragment Links
  and current repository workflow;
  application-specific managed-object details remain deferred;

SCN-DW-06:
  application-heavy Reference Object creation/confirmation flow;
  reuse of managed identity, explicit confirmation of portable or parsed proposals,
  canonical state ownership, definition location, optional home and app-only branches
  remain part of the deferred managed-object alternative;
  preserved by historical/deferred ITEM-* provenance, reference-object-model-and-lifecycle.md
  and Git history;
  no managed-object creation flow is migrated into the repository-native Key Scenarios;

SCN-DW-09:
  absorbed into Review Affected Uses;

SCN-DW-10..11:
  absorbed into Create, Link And Manage Repository Notes;
  generic category/object projection remains an implementation alternative;

SCN-DW-13:
  absorbed into Produce AI Transfer Copy;

SCN-DW-14:
  project-readable non-secret configuration remains supported current meaning where required;
  historical provenance includes ITEM-123;
  broad application settings UI remains unselected;

DATA-DW-* and BI-DW-*:
  no separate current owner files;
  useful behavior/data distinctions are represented inline in Key Scenarios,
  current Planning Draft/current workflows plus historical ITEM-* provenance where useful;
  old representation and runtime detail is preserved by Git history/deferred items.
```

The audit does not claim that every old application-runtime detail is selected. It only preserves current useful meaning and leaves deferred/retired meanings at their existing owners/history.

## 15. Repository Handoff

```text
apply the unified Scenario/reusable/root/projection package
  → verify exact HEAD and working-tree bases before replacements/deletions
  → use git add -N for linked-notes-end-to-end-workflow.md
  → inspect the complete diff
  → review browser/real-GitHub acceptance evidence
  → do not commit or push before diff approval.
```

This Planning Draft does not authorize repository edits beyond an explicitly applied package, implementation, commit or push.
