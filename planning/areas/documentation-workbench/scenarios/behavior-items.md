# Documentation Workbench Behavior Items

Status: preliminary item-backed Reference Object registry
Category of each owned object: Behavior Item
Scope: stable addressable units of clean required behavior derived from current Scenario Objects and Planning Items.

## Rules

- Every `BI-*` section below is a separate Reference Object definition with stable identity.
- Behavior Items are not implementation tasks, responsibility rows or Slices.
- Responsibility/domain/implementation classification happens later.
- A linked Planning Item change marks the object/file review-needed; no automatic rewrite occurs.

<a id="bi-dw-01-01"></a>
## BI-DW-01-01 — Begin long-message composition

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-01-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-01` |
| Type | entry |
| Scenario DATA | `DATA-DW-01-01` |
| Planning Items | `ITEM-121` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can begin preparing one long planning message.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-01-02"></a>
## BI-DW-01-02 — Preserve literal wording

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-01-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-01` |
| Type | invariant |
| Scenario DATA | `DATA-DW-01-01` |
| Planning Items | `ITEM-121` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The literal user wording remains available while structure is added.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-01-03"></a>
## BI-DW-01-03 — Add addressable structure

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-01-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-01` |
| Type | step |
| Scenario DATA | `DATA-DW-01-02` |
| Planning Items | `ITEM-121`, `ITEM-122` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can separate useful topics, questions, corrections, examples or other fragments.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-01-04"></a>
## BI-DW-01-04 — Produce one structured message

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-01-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-01` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-01-01`, `DATA-DW-01-02` |
| Planning Items | `ITEM-121` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The result remains one message whose structured parts can be addressed later.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-02-01"></a>
## BI-DW-02-01 — Preserve selected source context

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-02-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-02` |
| Type | step |
| Scenario DATA | `DATA-DW-02-01` |
| Planning Items | `ITEM-94`, `ITEM-122` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Complete relevant source messages and fragments remain available during item formation.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-02-02"></a>
## BI-DW-02-02 — Form complete item meanings

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-02-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-02` |
| Type | step |
| Scenario DATA | `DATA-DW-02-02` |
| Planning Items | `ITEM-110`, `ITEM-120` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Coherent proposed Planning Item meanings are formed without arbitrary length limits.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-02-03"></a>
## BI-DW-02-03 — Check relevant current owners

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-02-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-02` |
| Type | step |
| Scenario DATA | `DATA-DW-02-01`, `DATA-DW-02-02` |
| Planning Items | `ITEM-112`, `ITEM-98` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Relevant current owners are checked proportionally before final review.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-02-04"></a>
## BI-DW-02-04 — Show explicit transformations

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-02-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-02` |
| Type | step |
| Scenario DATA | `DATA-DW-02-02` |
| Planning Items | `ITEM-98`, `ITEM-41` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Non-trivial changes show Current, Incoming and Resulting meanings separately.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-02-05"></a>
## BI-DW-02-05 — Review item decisions

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-02-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-02` |
| Type | review gate |
| Scenario DATA | `DATA-DW-02-03` |
| Planning Items | `ITEM-41`, `ITEM-98` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can accept, correct, merge, split, re-home, link, reject, defer or leave meaning unresolved.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-02-06"></a>
## BI-DW-02-06 — Deliver accepted items

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-02-06` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-02` |
| Type | postcondition |
| Scenario DATA | `DATA-DW-02-03` |
| Planning Items | `ITEM-94`, `ITEM-98` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Accepted items are available in the selected portable or application-native mode.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-03-01"></a>
## BI-DW-03-01 — Assemble a complete picture

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-03-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-03` |
| Type | step |
| Scenario DATA | `DATA-DW-03-01`, `DATA-DW-03-02` |
| Planning Items | `ITEM-41`, `ITEM-98` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can assemble or update a readable trigger-to-result Full Picture.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-03-02"></a>
## BI-DW-03-02 — Keep item ownership canonical

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-03-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-03` |
| Type | invariant |
| Scenario DATA | `DATA-DW-03-01` |
| Planning Items | `ITEM-41`, `ITEM-98` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The picture links to Planning Items and does not become a second owner of their complete bodies.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-03-03"></a>
## BI-DW-03-03 — Review concern suggestions

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-03-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-03` |
| Type | step |
| Scenario DATA | `DATA-DW-03-03` |
| Planning Items | `ITEM-119` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can review relevant concern suggestions and their applicability.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-03-04"></a>
## BI-DW-03-04 — Create justified deep-work target

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-03-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-03` |
| Type | branch |
| Scenario DATA | `DATA-DW-03-03` |
| Planning Items | `ITEM-113` |
| Marker | ALT |
| Source review state | aligned at creation |

### Required Behavior

Separate deep work can be created when independent depth or lifecycle justifies it.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-03-05"></a>
## BI-DW-03-05 — Expose current open work

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-03-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-03` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-03-02`, `DATA-DW-03-03` |
| Planning Items | `ITEM-118`, `ITEM-113` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Questions, risks, evidence needs, concern states and deferred work remain visible with their concrete records.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-04-01"></a>
## BI-DW-04-01 — Read current owners

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-04-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-04` |
| Type | step |
| Scenario DATA | `DATA-DW-04-01` |
| Planning Items | `ITEM-98` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can inspect relevant current repository owners and source-linked meanings.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-04-02"></a>
## BI-DW-04-02 — Compare semantic states

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-04-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-04` |
| Type | step |
| Scenario DATA | `DATA-DW-04-02` |
| Planning Items | `ITEM-98`, `ITEM-41` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Current, Incoming and Resulting meanings are shown explicitly.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-04-03"></a>
## BI-DW-04-03 — Review identity and placement effects

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-04-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-04` |
| Type | review gate |
| Scenario DATA | `DATA-DW-04-02` |
| Planning Items | `ITEM-98`, `ITEM-112` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user reviews content, identity, relation and owner-placement effects before file work.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-04-04"></a>
## BI-DW-04-04 — Reuse managed item identity

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-04-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-04` |
| Type | invariant |
| Scenario DATA | `DATA-DW-04-03` |
| Planning Items | `ITEM-22B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

An already managed Planning Item is handed off without creating a second object.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-04-05"></a>
## BI-DW-04-05 — Produce explicit documentation handoff

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-04-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-04` |
| Type | postcondition |
| Scenario DATA | `DATA-DW-04-03` |
| Planning Items | `ITEM-98`, `ITEM-22B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Accepted meaning has a clear managed or portable documentation path, or remains explicitly unresolved.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-05-01"></a>
## BI-DW-05-01 — Select documentation scope

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-05-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-05` |
| Type | entry |
| Scenario DATA | `DATA-DW-05-01` |
| Planning Items | `ITEM-34B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can select the repository, file, folder, Markdown source or new-document context to work with.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-05-02"></a>
## BI-DW-05-02 — Load complete source content

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-05-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-05` |
| Type | step |
| Scenario DATA | `DATA-DW-05-02` |
| Planning Items | `ITEM-32B`, `ITEM-34B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The selected content is loaded without dropping ordinary text or managed reference forms.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-05-03"></a>
## BI-DW-05-03 — Recognize existing and proposed regions

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-05-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-05` |
| Type | step |
| Scenario DATA | `DATA-DW-05-03` |
| Planning Items | `ITEM-31B`, `ITEM-32B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Known object/reference regions and possible proposed objects are identified when present.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-05-04"></a>
## BI-DW-05-04 — Keep proposal conflicts visible

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-05-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-05` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-05-03` |
| Planning Items | `ITEM-31B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Ambiguous or conflicting identity remains visible and no proposed object is silently created.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-06-01"></a>
## BI-DW-06-01 — Distinguish object entry path

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-06-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-06` |
| Type | step |
| Scenario DATA | `DATA-DW-06-01` |
| Planning Items | `ITEM-22B`, `ITEM-87`, `ITEM-31B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can see whether the selected meaning is already managed or still requires confirmation.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-06-02"></a>
## BI-DW-06-02 — Review object boundary

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-06-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-06` |
| Type | review gate |
| Scenario DATA | `DATA-DW-06-01`, `DATA-DW-06-02` |
| Planning Items | `ITEM-87`, `ITEM-31B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The proposed independent object boundary and existing identity are reviewable.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-06-03"></a>
## BI-DW-06-03 — Confirm or decline managed creation

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-06-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-06` |
| Type | branch |
| Scenario DATA | `DATA-DW-06-02` |
| Planning Items | `ITEM-22B`, `ITEM-87`, `ITEM-31B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Portable, extracted or parsed proposals become managed objects only after explicit confirmation; the user may reject or defer.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-06-04"></a>
## BI-DW-06-04 — Choose ownership and optional home

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-06-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-06` |
| Type | step |
| Scenario DATA | `DATA-DW-06-03` |
| Planning Items | `ITEM-23B`, `ITEM-91` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can establish or review canonical state ownership, definition location and optional home.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-06-05"></a>
## BI-DW-06-05 — Expose confirmed object

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-06-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-06` |
| Type | postcondition |
| Scenario DATA | `DATA-DW-06-03` |
| Planning Items | `ITEM-86`, `ITEM-108` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The confirmed object becomes available for authoring and references, or unresolved state remains explicit.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-07-01"></a>
## BI-DW-07-01 — Edit canonical text

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-07-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-07` |
| Type | step |
| Scenario DATA | `DATA-DW-07-01` |
| Planning Items | `ITEM-93` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can create or change text at the canonical document/object owner.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-07-02"></a>
## BI-DW-07-02 — Edit valid flexible fields

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-07-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-07` |
| Type | step |
| Scenario DATA | `DATA-DW-07-02` |
| Planning Items | `ITEM-103` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can add or change correctly represented fields without one fixed universal schema.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-07-03"></a>
## BI-DW-07-03 — See category guidance and conflicts

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-07-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-07` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-07-02` |
| Planning Items | `ITEM-106`, `ITEM-97` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Applicable field expectations or conflicts are visible when category guidance applies.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-07-04"></a>
## BI-DW-07-04 — Prevent linked-content editing

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-07-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-07` |
| Type | invariant |
| Scenario DATA | `DATA-DW-07-01` |
| Planning Items | `ITEM-90` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Content obtained through a reference is not edited at its use site as though it were canonical.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-08-01"></a>
## BI-DW-08-01 — Select a reference target

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-08-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-08` |
| Type | step |
| Scenario DATA | `DATA-DW-08-01` |
| Planning Items | `ITEM-114` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can select an existing Reference Object, Documentation File or stable File Location target.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-08-02"></a>
## BI-DW-08-02 — Choose relation meaning

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-08-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-08` |
| Type | step |
| Scenario DATA | `DATA-DW-08-02` |
| Planning Items | `ITEM-114` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can choose or confirm the relation meaning independently of the target type.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-08-03"></a>
## BI-DW-08-03 — Choose full or bare object representation

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-08-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-08` |
| Type | step |
| Scenario DATA | `DATA-DW-08-02` |
| Planning Items | `ITEM-88`, `ITEM-73` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

For object content, the user can choose full-text or bare representation without changing target identity.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-08-04"></a>
## BI-DW-08-04 — Place managed reference

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-08-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-08` |
| Type | postcondition |
| Scenario DATA | `DATA-DW-08-03` |
| Planning Items | `ITEM-101`, `ITEM-83`, `ITEM-105` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The managed reference is present in the current document or object field.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-08-05"></a>
## BI-DW-08-05 — Open referenced target

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-08-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-08` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-08-03` |
| Planning Items | `ITEM-90`, `ITEM-114` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can navigate from the occurrence to the referenced target and available contexts.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-09-01"></a>
## BI-DW-09-01 — Produce complete Markdown

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-09-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-09` |
| Type | step |
| Scenario DATA | `DATA-DW-09-01` |
| Planning Items | `ITEM-34B`, `ITEM-32B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The affected files can be produced as complete Markdown for review.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-09-02"></a>
## BI-DW-09-02 — Detect affected uses

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-09-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-09` |
| Type | step |
| Scenario DATA | `DATA-DW-09-02` |
| Planning Items | `ITEM-29B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Dependent document, field and scenario-layer uses are identified after a referenced source changes.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-09-03"></a>
## BI-DW-09-03 — Mark affected uses review-needed

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-09-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-09` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-09-02` |
| Planning Items | `ITEM-89`, `ITEM-16B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Affected uses show review-needed state while previous reviewed content remains available.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-09-04"></a>
## BI-DW-09-04 — Review each affected use

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-09-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-09` |
| Type | review gate |
| Scenario DATA | `DATA-DW-09-03` |
| Planning Items | `ITEM-89`, `ITEM-16B` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can refresh, confirm current, remove or replace the reference.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-09-05"></a>
## BI-DW-09-05 — Keep unresolved use pending

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-09-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-09` |
| Type | branch |
| Scenario DATA | `DATA-DW-09-03` |
| Planning Items | `ITEM-16B` |
| Marker | ALT |
| Source review state | aligned at creation |

### Required Behavior

An affected use may remain explicitly Pending Review.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-10-01"></a>
## BI-DW-10-01 — Start standalone Note creation

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-10-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-10` |
| Type | entry |
| Scenario DATA | `DATA-DW-10-01` |
| Planning Items | `ITEM-124`, `ITEM-91` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can begin creating a Note without selecting another object.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-10-02"></a>
## BI-DW-10-02 — Enter optional Note title

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-10-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-10` |
| Type | step |
| Scenario DATA | `DATA-DW-10-01` |
| Planning Items | `ITEM-124` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user may provide a Note title or leave it absent.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-10-03"></a>
## BI-DW-10-03 — Enter Note text

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-10-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-10` |
| Type | step |
| Scenario DATA | `DATA-DW-10-01` |
| Planning Items | `ITEM-124`, `ITEM-103` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user may provide or change the Note text.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-10-04"></a>
## BI-DW-10-04 — Find Note among Notes

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-10-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-10` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-10-02` |
| Planning Items | `ITEM-124`, `ITEM-118` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The created Note is available among Notes as the same semantic object.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-10-05"></a>
## BI-DW-10-05 — Open and edit standalone Note

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-10-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-10` |
| Type | postcondition |
| Scenario DATA | `DATA-DW-10-01` |
| Planning Items | `ITEM-124` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can open and edit the created standalone Note.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-11-01"></a>
## BI-DW-11-01 — Start Note creation for selected object

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-11-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-11` |
| Type | entry |
| Scenario DATA | `DATA-DW-11-01` |
| Planning Items | `ITEM-124`, `ITEM-114` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can begin adding a Note for the selected object.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-11-02"></a>
## BI-DW-11-02 — Enter optional object-linked Note title

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-11-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-11` |
| Type | step |
| Scenario DATA | `DATA-DW-11-02` |
| Planning Items | `ITEM-124` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user may provide a title or leave it absent.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-11-03"></a>
## BI-DW-11-03 — Enter object-linked Note text

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-11-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-11` |
| Type | step |
| Scenario DATA | `DATA-DW-11-02` |
| Planning Items | `ITEM-124`, `ITEM-103` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user may provide or change the Note text.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-11-04"></a>
## BI-DW-11-04 — Find Note for selected object

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-11-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-11` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-11-03` |
| Planning Items | `ITEM-124`, `ITEM-118` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The created Note is available in the Note context for the selected object.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-11-05"></a>
## BI-DW-11-05 — Find same Note among all Notes

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-11-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-11` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-11-03` |
| Planning Items | `ITEM-124`, `ITEM-118` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The same Note is also available among all Notes without becoming a duplicate.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-11-06"></a>
## BI-DW-11-06 — Open and edit object-linked Note

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-11-06` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-11` |
| Type | postcondition |
| Scenario DATA | `DATA-DW-11-02` |
| Planning Items | `ITEM-124` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can open and edit the created Note independently of the target object content.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-12-01"></a>
## BI-DW-12-01 — Select related navigation target

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-12-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-12` |
| Type | entry |
| Scenario DATA | `DATA-DW-12-01` |
| Planning Items | `ITEM-35B`, `ITEM-104` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can select a related file, object, item, source, picture, occurrence or review target.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-12-02"></a>
## BI-DW-12-02 — Open available target context

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-12-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-12` |
| Type | step |
| Scenario DATA | `DATA-DW-12-01` |
| Planning Items | `ITEM-35B`, `ITEM-104` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The available target and its supported canonical/home/occurrence context can be opened.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-12-03"></a>
## BI-DW-12-03 — Filter related context view

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-12-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-12` |
| Type | step |
| Scenario DATA | `DATA-DW-12-02` |
| Planning Items | `ITEM-118`, `ITEM-95` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can use supported relation/category/status criteria to inspect related existing objects and records.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-12-04"></a>
## BI-DW-12-04 — Aggregate folder context

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-12-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-12` |
| Type | branch |
| Scenario DATA | `DATA-DW-12-02` |
| Planning Items | `ITEM-96`, `ITEM-111` |
| Marker | ALT |
| Source review state | aligned at creation |

### Required Behavior

The user can inspect related context across a selected folder, optionally including subfolders.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-13-01"></a>
## BI-DW-13-01 — Request expanded copy for selected file

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-13-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-13` |
| Type | entry |
| Scenario DATA | `DATA-DW-13-01` |
| Planning Items | `ITEM-107` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can request an expanded transfer copy for a selected documentation file.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-13-02"></a>
## BI-DW-13-02 — Expand resolvable referenced content

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-13-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-13` |
| Type | step |
| Scenario DATA | `DATA-DW-13-01`, `DATA-DW-13-02` |
| Planning Items | `ITEM-107` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Referenced object content that can be resolved is included in the transfer copy.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-13-03"></a>
## BI-DW-13-03 — Preserve identity and boundaries

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-13-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-13` |
| Type | invariant |
| Scenario DATA | `DATA-DW-13-02` |
| Planning Items | `ITEM-107` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Expanded content keeps object identity and boundary information visible.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-13-04"></a>
## BI-DW-13-04 — Expose unresolved targets

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-13-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-13` |
| Type | branch |
| Scenario DATA | `DATA-DW-13-01`, `DATA-DW-13-02` |
| Planning Items | `ITEM-107` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Missing or unresolved reference targets remain explicit in the transfer result.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-13-05"></a>
## BI-DW-13-05 — Leave saved Markdown unchanged

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-13-05` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-13` |
| Type | postcondition |
| Scenario DATA | `DATA-DW-13-02` |
| Planning Items | `ITEM-107` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The expanded copy becomes available without changing the saved Markdown.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-14-01"></a>
## BI-DW-14-01 — Select configurable convention

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-14-01` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-14` |
| Type | entry |
| Scenario DATA | `DATA-DW-14-01` |
| Planning Items | `ITEM-123` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can select a value that the application exposes as configurable.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-14-02"></a>
## BI-DW-14-02 — Provide intended convention value

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-14-02` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-14` |
| Type | step |
| Scenario DATA | `DATA-DW-14-01` |
| Planning Items | `ITEM-123` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

The user can provide or choose the intended value for the selected convention.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-14-03"></a>
## BI-DW-14-03 — Use controlled update instead of blind replacement

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-14-03` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-14` |
| Type | invariant |
| Scenario DATA | `DATA-DW-14-02` |
| Planning Items | `ITEM-123` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

Changing the convention produces a controlled configuration/documentation update rather than a blind global text replacement.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.

<a id="bi-dw-14-04"></a>
## BI-DW-14-04 — Preserve project-readable convention state

| Field | Value |
|---|---|
| Behavior Item | `BI-DW-14-04` |
| Category | Behavior Item |
| Parent Scenario | `SCN-DW-14` |
| Type | observable outcome |
| Scenario DATA | `DATA-DW-14-02` |
| Planning Items | `ITEM-123` |
| Marker | CORE |
| Source review state | aligned at creation |

### Required Behavior

When an AI route consumes the convention, the reviewed current value is available in a project-readable representation.

### Boundaries

- No implementation mechanism is selected.
- This Behavior Item does not define a Slice.
