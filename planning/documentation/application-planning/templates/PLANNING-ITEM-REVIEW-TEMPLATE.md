# Planning Item Review Template

Status: active reusable recommended template
Doc version: v0.1.0-full-message-two-mode-review
Purpose: exact reusable review shape for proposed new, updated, merged, split, re-homed, superseded, rejected or deferred Planning Items.

Use only sections that improve the current review. Do not shorten the complete item meaning merely to fit this template.

## 1. Review Identity

| Field | Value |
|---|---|
| Review ID | <ID or temporary review identity> |
| Selected source | <conversation/file/ledger/reference> |
| Source completeness | complete / partial / missing parts declared |
| Target planning owner | <project-local owner or unresolved> |
| Intended delivery mode | portable Markdown / application-native / auto / undecided |
| Repository state checked | <commit/ref/files or not checked> |
| Review status | proposed / corrected / accepted / partially accepted / rejected / deferred |

## 2. Source Selection And Limits

```text
Selected current source:
  <source>

Included source messages/files:
  <identities>

Known missing source:
  <none or declared gaps>

Not treated as current automatically:
  <earlier archives/files/messages>
```

## 3. Checked Current Owners

| Owner / item | Checked scope | Current relevant meaning | Relation to incoming meaning | Not checked / uncertainty |
|---|---|---|---|---|
| <owner> | <targeted/full> | <meaning> | <relation> | <limit> |

Use semantic names first and technical IDs second.

## 4. Document-Ready Explanatory Sections

Write the complete accumulating meanings here when the response needs readable explanation before item-by-item review.

```text
The final item blocks below must reuse/materialize these complete meanings.
They must not replace them with shorter lossy paraphrases.
```

## 5. Planning Items For Review

### 5.1 New

<List only meanings with no compatible current owner.>

### 5.2 Updated

<List current identities whose responsibility survives with changed meaning.>

### 5.3 Merge / Split / Re-home / Supersede

<List non-trivial transformations.>

### 5.4 Rejected As Separate

<List incoming meanings that remain source/provenance but do not become separate active items.>

### 5.5 Unresolved / Deferred

<List meanings or placement/identity choices that remain open.>

---

## 6. Complete Planning Item Block

Repeat this complete block for every reviewed resulting item.

### <Semantic Planning Item Name>

#### Identity

| Field | Value |
|---|---|
| Current canonical ID | <ID / none / unresolved> |
| Temporary review identity | <CHAT-PI/RESULT/local ID or none> |
| Semantic code/name | <name> |
| Item kind / role | <role> |
| Item scale | <optional> |
| Evidence status | confirmed / inference / question / decision candidate / decision / evidence |
| Proposed action | Keep / Update / Rename / Add / Merge / Split / Move / Link / Defer / Supersede / Reject |
| Proposed owner | <owner or unresolved> |
| Semantic home | <reference / none / unresolved> |
| Definition location | <path/location / app-only / portable / unresolved> |
| Documentation state | Working / Needs Documentation / Documented/Integrated / Unresolved / Deferred / Absorbed/Superseded / Rejected |
| Delivery mode | portable / application-native / both-compatible |

#### Complete Meaning Body

<The full authoritative working meaning. Include every rationale, example, distinction, exception, boundary, consequence and acceptance detail required for correct understanding and reuse. No arbitrary length limit.>

#### Purpose And Distinctions

```text
Purpose:
  <why this item exists>

Distinct from:
  <nearby meanings/entities/states>

Does not imply:
  <important non-implications>
```

#### Current-Owner Relation

| Current owner/item | Current meaning | Incoming relation | Resulting effect |
|---|---|---|---|
| <owner> | <meaning> | Already Covered / Supports / Extends / Clarifies / Corrects / Conflicts / Replaces / Different Scope / New Meaning | <effect> |

#### Relations

| Relation | Target | Meaning |
|---|---|---|
| <typed relation> | <target> | <why> |

#### Validation Context — Optional

| Signal | Content | Status / evidence | Decision affected |
|---|---|---|---|
| Hypothesis / assumption | <content> | <status> | <decision> |
| Risk / key situation | <content> | <status> | <decision> |
| Prototype / test candidate | <minimum situation to execute/observe> | proposed / active / resolved | <decision> |
| Evidence needed | <evidence> | <status> | <decision> |

Omit empty rows. Do not turn validation context into a universal schema.

#### Typed Source Contributions

| Order | Source message/fragment | Role | Exact anchor | Relevant span | Notes |
|---:|---|---|---|---|---|
| 1 | <source identity> | Primary / Supporting / Clarifying / Correcting / Contradicting / Example / Confirmation | <anchor> | <span> | <notes> |

#### Full User-Message Source(s)

Repeat every complete supporting user message under every item it supports.

##### Source 1 — <identity / timestamp / turn>

> <Complete original user message. Highlight relevant spans while retaining all surrounding context.>

Exact anchor:

```text
<anchor>
```

Contribution role:

```text
Primary / Supporting / Clarifying / Correcting / Contradicting / Example / Confirmation
```

##### Source 2 — <identity / timestamp / turn>

> <Complete original user message, in chronological order.>

Do not invent missing source wording.

#### Review Decision

```text
accept;
accept with correction;
accept transformation;
reject as separate;
defer;
leave unresolved.
```

Decision:

<user decision or pending>

---

## 7. Non-Trivial Transformation Block

Use one block per coherent transformation. Do not collapse Current, Incoming and Resulting meanings into one row.

| Role | Semantic name | ID / source | Owner / status | Complete core meaning | Relation / contribution | Proposed action/effect | Identity/history effect | Choice |
|---|---|---|---|---|---|---|---|---|
| Current | <name> | <ID> | <owner> | <independently understandable current meaning> | <target> | <preserved/changed> | <surviving identity> | <choice or —> |
| Incoming | <name> | <source ID> | <working source> | <independently understandable incoming meaning> | <Extends/Corrects/etc.> | <adds/corrects/removes> | <survives/absorbed/etc.> | <choice or —> |
| Resulting | <name> | <result ID> | <result owner> | <complete resulting meaning> | <derived from named rows> | <resulting effect> | <identity and mappings> | <choice or —> |

For merge, split, move, supersede or reject, add as many rows as required.

## 8. Resulting Item Set

| Semantic item | Canonical/review identity | Resulting owner | State | Source/provenance mappings |
|---|---|---|---|---|
| <item> | <ID> | <owner> | <state> | <mappings> |

## 9. Delivery Result

### Portable Markdown

```text
- return the full updated ledger;
- preserve complete item bodies;
- preserve full per-item source messages;
- preserve typed contributions and transformations.
```

Result:

<path/name or not selected>

### Application-Native

```text
- distinguish existing references from proposed new/updated items;
- only explicit confirmation creates accepted managed item state;
- confirmed Planning Item is immediately a managed Reference Object;
- later Markdown placement does not create a second item.
```

Result:

<structured response/import status or not selected>

## 10. Unresolved Choices

| Priority | Choice | Why it matters | Conservative fallback |
|---:|---|---|---|
| 1 | <choice> | <impact> | <fallback that does not invent acceptance> |

## 11. Checked / Not Checked

```text
Checked:
  <sources/owners>

Not checked:
  <sources/owners>

Repository files edited:
  no, unless a separate authorized workflow says otherwise.

Commit/push:
  not authorized by this review template.
```
