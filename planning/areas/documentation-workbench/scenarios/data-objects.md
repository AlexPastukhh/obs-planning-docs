# Documentation Workbench Scenario DATA Objects

Status: preliminary item-backed Reference Object registry
Category of each owned object: Scenario DATA
Scope: user-visible or scenario-relevant DATA supported by current Planning Items and Scenario Objects; not domain/API/database/UI-component design.

## Rules

- Every `DATA-*` section below is a separate Reference Object definition with stable identity.
- Only explicit or checked DATA is included.
- Each object links to a parent Scenario, Behavior Items and narrower Planning Item sources.
- A linked Planning Item change marks the object/file review-needed; no automatic rewrite occurs.

<a id="data-dw-01-01"></a>
## DATA-DW-01-01 — Planning Message Text

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-01-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-01` |
| Planning Items | `ITEM-121` |
| Used by Behavior Items | `BI-DW-01-01`, `BI-DW-01-02`, `BI-DW-01-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- literal user message content

### Validation / Rules

- Literal wording remains available.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-01-02"></a>
## DATA-DW-01-02 — Addressable Message Structure

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-01-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-01` |
| Planning Items | `ITEM-121`, `ITEM-122` |
| Used by Behavior Items | `BI-DW-01-03`, `BI-DW-01-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- user-created topics, subtopics, questions, corrections, examples or other addressable fragments

### Validation / Rules

- Structure does not require every fragment to become a Planning Item.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-02-01"></a>
## DATA-DW-02-01 — Selected Planning Source

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-02-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-02` |
| Planning Items | `ITEM-94`, `ITEM-122` |
| Used by Behavior Items | `BI-DW-02-01`, `BI-DW-02-03` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- selected discussion, message, file, response or ledger
- complete relevant source messages/fragments

### Validation / Rules

- Source remains readable during review.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-02-02"></a>
## DATA-DW-02-02 — Proposed Planning Item Set

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-02-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-02` |
| Planning Items | `ITEM-110`, `ITEM-120`, `ITEM-112` |
| Used by Behavior Items | `BI-DW-02-02`, `BI-DW-02-03`, `BI-DW-02-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- stable item identity/code
- complete proposed meaning
- item kind/scale/relations
- Current / Incoming / Resulting transformations when needed

### Validation / Rules

- Complete meaning has no arbitrary length cap.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-02-03"></a>
## DATA-DW-02-03 — Planning Item Review Decision

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-02-03` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-02` |
| Planning Items | `ITEM-41`, `ITEM-98` |
| Used by Behavior Items | `BI-DW-02-05`, `BI-DW-02-06` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- accept, correct, merge, split, re-home, link, reject, defer or unresolved choice
- portable or application-native delivery choice

### Validation / Rules

- Acceptance is explicit.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-03-01"></a>
## DATA-DW-03-01 — Contributing Planning Item Set

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-03-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-03` |
| Planning Items | `ITEM-41`, `ITEM-98` |
| Used by Behavior Items | `BI-DW-03-01`, `BI-DW-03-02` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- Planning Item references and relation roles used by the picture

### Validation / Rules

- Complete item bodies remain at item owners.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-03-02"></a>
## DATA-DW-03-02 — Full Picture State

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-03-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-03` |
| Planning Items | `ITEM-41`, `ITEM-98` |
| Used by Behavior Items | `BI-DW-03-01`, `BI-DW-03-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- trigger, accepted inputs, mandatory stages, branches/loops, review gates and result
- child-picture references where independently traversable

### Validation / Rules

- One picture must remain followable from trigger to result.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-03-03"></a>
## DATA-DW-03-03 — Concern And Deep-Work State

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-03-03` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-03` |
| Planning Items | `ITEM-119`, `ITEM-113`, `ITEM-118` |
| Used by Behavior Items | `BI-DW-03-03`, `BI-DW-03-04`, `BI-DW-03-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- concern suggestions and dispositions
- Applied Concerns and linked work targets
- open questions, risks, assumptions, evidence/prototype needs, deferred/blocked state

### Validation / Rules

- Suggestions do not become Applied Concerns automatically.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-04-01"></a>
## DATA-DW-04-01 — Repository Owner Context

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-04-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-04` |
| Planning Items | `ITEM-98` |
| Used by Behavior Items | `BI-DW-04-01` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- current repository owners and their source-linked meanings

### Validation / Rules

- Only checked owners are treated as current facts.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-04-02"></a>
## DATA-DW-04-02 — Semantic Transformation Map

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-04-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-04` |
| Planning Items | `ITEM-98`, `ITEM-41`, `ITEM-112` |
| Used by Behavior Items | `BI-DW-04-02`, `BI-DW-04-03` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- Current, Incoming and Resulting item/owner meanings
- identity, relation and placement effects

### Validation / Rules

- Non-trivial changes remain explicit.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-04-03"></a>
## DATA-DW-04-03 — Documentation Handoff Choice

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-04-03` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-04` |
| Planning Items | `ITEM-22B`, `ITEM-98` |
| Used by Behavior Items | `BI-DW-04-04`, `BI-DW-04-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- managed application-native item path
- portable reviewed meaning path
- unresolved/conflict state

### Validation / Rules

- Managed identity is reused.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-05-01"></a>
## DATA-DW-05-01 — Documentation Scope Selection

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-05-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-05` |
| Planning Items | `ITEM-34B` |
| Used by Behavior Items | `BI-DW-05-01` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- repository working tree, file, folder, Markdown source or new document context
- recursive/non-recursive folder choice when applicable

### Validation / Rules

- Selected scope remains explicit.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-05-02"></a>
## DATA-DW-05-02 — Loaded Markdown Content

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-05-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-05` |
| Planning Items | `ITEM-32B` |
| Used by Behavior Items | `BI-DW-05-02` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- ordinary text
- recognized canonical object definitions
- full-text and bare references
- proposed object regions when present

### Validation / Rules

- Complete source content remains available.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-05-03"></a>
## DATA-DW-05-03 — Recognition And Conflict State

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-05-03` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-05` |
| Planning Items | `ITEM-31B` |
| Used by Behavior Items | `BI-DW-05-03`, `BI-DW-05-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- recognized known objects
- proposed objects
- missing/ambiguous identity conflicts

### Validation / Rules

- Proposals are not created automatically.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-06-01"></a>
## DATA-DW-06-01 — Reference Object Entry Meaning

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-06-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-06` |
| Planning Items | `ITEM-22B`, `ITEM-87`, `ITEM-31B` |
| Used by Behavior Items | `BI-DW-06-01`, `BI-DW-06-02` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- existing managed Planning Item
- portable reviewed meaning
- existing documentation fragment
- parsed proposal

### Validation / Rules

- Entry type determines whether identity already exists.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-06-02"></a>
## DATA-DW-06-02 — Object Confirmation Decision

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-06-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-06` |
| Planning Items | `ITEM-22B`, `ITEM-87`, `ITEM-31B` |
| Used by Behavior Items | `BI-DW-06-02`, `BI-DW-06-03` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- confirm, reject, defer or unresolved identity choice

### Validation / Rules

- Portable/fragment/parsed proposals require confirmation.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-06-03"></a>
## DATA-DW-06-03 — Object Ownership And Location Choice

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-06-03` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-06` |
| Planning Items | `ITEM-23B`, `ITEM-108`, `ITEM-91` |
| Used by Behavior Items | `BI-DW-06-04`, `BI-DW-06-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- canonical state owner
- definition location
- optional semantic home
- Markdown-backed or temporary app-only durability

### Validation / Rules

- Definition location and home remain distinct.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-07-01"></a>
## DATA-DW-07-01 — Canonical Text Content

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-07-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-07` |
| Planning Items | `ITEM-93`, `ITEM-90` |
| Used by Behavior Items | `BI-DW-07-01`, `BI-DW-07-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- document or object owner text being created or edited

### Validation / Rules

- Linked occurrence text is not editable as canonical content.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-07-02"></a>
## DATA-DW-07-02 — Object Fields And Category Guidance

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-07-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-07` |
| Planning Items | `ITEM-103`, `ITEM-106`, `ITEM-97` |
| Used by Behavior Items | `BI-DW-07-02`, `BI-DW-07-03` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- correctly represented user-defined fields
- category/type/status values
- applicable guidance, expected fields or visible conflicts

### Validation / Rules

- Unknown additional valid fields remain allowed by default.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-08-01"></a>
## DATA-DW-08-01 — Reference Target Selection

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-08-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-08` |
| Planning Items | `ITEM-114` |
| Used by Behavior Items | `BI-DW-08-01` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- Reference Object, Documentation File or stable File Location target
- resolved, missing or ambiguous state

### Validation / Rules

- Target type and relation meaning remain distinct.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-08-02"></a>
## DATA-DW-08-02 — Reference Meaning And Representation Choice

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-08-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-08` |
| Planning Items | `ITEM-114`, `ITEM-88`, `ITEM-73` |
| Used by Behavior Items | `BI-DW-08-02`, `BI-DW-08-03` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- relation meaning
- full-text or bare representation for object content

### Validation / Rules

- Representation mode does not change target identity.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-08-03"></a>
## DATA-DW-08-03 — Managed Reference Occurrence

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-08-03` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-08` |
| Planning Items | `ITEM-101`, `ITEM-83`, `ITEM-105` |
| Used by Behavior Items | `BI-DW-08-04`, `BI-DW-08-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- placed managed reference and its available navigation target

### Validation / Rules

- Linked content remains read-only at use site.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-09-01"></a>
## DATA-DW-09-01 — Saved Markdown Result

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-09-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-09` |
| Planning Items | `ITEM-34B`, `ITEM-32B` |
| Used by Behavior Items | `BI-DW-09-01` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- complete affected Markdown files and diff-ready state

### Validation / Rules

- Ordinary prose and managed object/reference content remain present.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-09-02"></a>
## DATA-DW-09-02 — Affected 

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-09-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-09` |
| Planning Items | `ITEM-29B`, `ITEM-89`, `ITEM-16B` |
| Used by Behavior Items | `BI-DW-09-02`, `BI-DW-09-03` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- dependent documents, object fields, Scenario objects, Scenario DATA objects, Behavior Items and definition files
- changed source context
- review-needed state

### Validation / Rules

- Previous reviewed materialization remains until review.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-09-03"></a>
## DATA-DW-09-03 — Affected Use Review Decision

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-09-03` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-09` |
| Planning Items | `ITEM-89`, `ITEM-16B` |
| Used by Behavior Items | `BI-DW-09-04`, `BI-DW-09-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- refresh, confirm current, remove reference, replace reference or leave pending

### Validation / Rules

- No automatic rewrite.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-10-01"></a>
## DATA-DW-10-01 — Standalone Note Details

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-10-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-10` |
| Planning Items | `ITEM-124`, `ITEM-103` |
| Used by Behavior Items | `BI-DW-10-01`, `BI-DW-10-02`, `BI-DW-10-03`, `BI-DW-10-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- optional title
- Note text

### Validation / Rules

- Title is optional.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-10-02"></a>
## DATA-DW-10-02 — All Notes Entry

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-10-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-10` |
| Planning Items | `ITEM-124`, `ITEM-118` |
| Used by Behavior Items | `BI-DW-10-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- the created Note as available among Notes

### Validation / Rules

- The view exposes the existing Note rather than a copy.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-11-01"></a>
## DATA-DW-11-01 — Selected Note Target

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-11-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-11` |
| Planning Items | `ITEM-124`, `ITEM-114` |
| Used by Behavior Items | `BI-DW-11-01` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- selected object to which the Note is added

### Validation / Rules

- One initial target is supported; multi-target behavior is open.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-11-02"></a>
## DATA-DW-11-02 — Object-Linked Note Details

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-11-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-11` |
| Planning Items | `ITEM-124`, `ITEM-103` |
| Used by Behavior Items | `BI-DW-11-02`, `BI-DW-11-03`, `BI-DW-11-06` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- optional title
- Note text

### Validation / Rules

- Title is optional.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-11-03"></a>
## DATA-DW-11-03 — Note Visibility Contexts

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-11-03` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-11` |
| Planning Items | `ITEM-124`, `ITEM-118` |
| Used by Behavior Items | `BI-DW-11-04`, `BI-DW-11-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- Note as visible for the selected object
- the same Note as visible among all Notes

### Validation / Rules

- Multiple views do not create multiple semantic Notes.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-12-01"></a>
## DATA-DW-12-01 — Navigation Target

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-12-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-12` |
| Planning Items | `ITEM-35B`, `ITEM-104` |
| Used by Behavior Items | `BI-DW-12-01`, `BI-DW-12-02` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- file, object, canonical location, optional home, occurrence, Planning Item, source, Full Picture or review target
- resolved or unresolved target state

### Validation / Rules

- False target matches are not invented.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-12-02"></a>
## DATA-DW-12-02 — Related Context View

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-12-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-12` |
| Planning Items | `ITEM-111`, `ITEM-95`, `ITEM-96`, `ITEM-118` |
| Used by Behavior Items | `BI-DW-12-03`, `BI-DW-12-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- related existing objects/records grouped or filtered by supported context
- folder aggregation with optional subfolders

### Validation / Rules

- Views expose existing state only.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-13-01"></a>
## DATA-DW-13-01 — Selected File And Reference State

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-13-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-13` |
| Planning Items | `ITEM-107` |
| Used by Behavior Items | `BI-DW-13-01`, `BI-DW-13-02`, `BI-DW-13-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- selected documentation file
- referenced object occurrences in that file
- resolved, missing or unresolved target state

### Validation / Rules

- Missing or unresolved targets remain explicit.

### Boundaries

- No additional common application fields are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-13-02"></a>
## DATA-DW-13-02 — Expanded Transfer Copy

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-13-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-13` |
| Planning Items | `ITEM-107` |
| Used by Behavior Items | `BI-DW-13-02`, `BI-DW-13-03`, `BI-DW-13-04`, `BI-DW-13-05` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- selected file content with resolvable referenced object content expanded
- preserved object identity and boundary information
- explicit missing or unresolved target indicators

### Validation / Rules

- Producing the copy does not mutate saved Markdown.
- The copy is not complete application-state synchronization.

### Boundaries

- Exact transfer representation is not selected.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-14-01"></a>
## DATA-DW-14-01 — Configurable Convention Choice

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-14-01` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-14` |
| Planning Items | `ITEM-123` |
| Used by Behavior Items | `BI-DW-14-01`, `BI-DW-14-02` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- selected configurable value
- current value
- intended value
- examples may include Planning Item delimiters, owner paths, labels, default views or parser options when exposed

### Validation / Rules

- Only values actually exposed as configurable participate.

### Boundaries

- No additional settings are inferred.
- Domain, DTO, API, persistence and component ownership are not decided here.

<a id="data-dw-14-02"></a>
## DATA-DW-14-02 — Controlled Convention Update Result

| Field | Value |
|---|---|
| DATA Object | `DATA-DW-14-02` |
| Category | Scenario DATA |
| Parent Scenario | `SCN-DW-14` |
| Planning Items | `ITEM-123` |
| Used by Behavior Items | `BI-DW-14-03`, `BI-DW-14-04` |
| Source review state | aligned at creation |

### Actor-Visible / Scenario-Relevant DATA

- reviewed current configured value
- controlled configuration/documentation update
- project-readable representation when the convention is used by AI routes

### Validation / Rules

- The result is not a blind global text replacement.

### Boundaries

- Exact runtime storage and synchronization mechanism are not selected.
- Domain, DTO, API, persistence and component ownership are not decided here.
