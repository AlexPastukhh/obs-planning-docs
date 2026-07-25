# Documentation Workbench Planning Draft

Status: active current project-local Planning Draft
Doc version: v1.0.0-repository-native-direction
Purpose: organize the reviewed Documentation Workbench Planning Items around the selected repository-native direction without creating a second item-body owner.

Canonical item owner: [`planning-item-register.md`](planning-item-register.md)

## 1. Draft Identity

| Field | Value |
|---|---|
| Planning direction | Repository-native documentation planning and small independently useful helpers |
| Status | selected current direction / implementation not selected |
| Source register | [`planning-item-register.md`](planning-item-register.md) |
| Historical inactive items | [`retired-planning-items.md`](retired-planning-items.md) |
| Previous route | [`full-picture.md`](full-picture.md) compatibility pointer |

## 2. Desired Result

Use ordinary repository Markdown, stable links, existing editors and Git review as the normal workspace. Add a small helper only where current tools do not provide an independently useful behavior.

The result remains understandable and editable without the helper.

## 3. Acceptance Criteria

| ID | Criterion | Status | Related items |
|---|---|---|---|
| AC-01 | Complete documentation meaning remains in repository Markdown. | accepted current | `ITEM-23B`, `ITEM-28B` |
| AC-02 | A user can edit and review changes through an ordinary Git working-tree/diff workflow. | accepted current | `ITEM-34B` |
| AC-03 | File and section navigation uses portable Markdown links, including parent/sibling repository paths. | accepted current | `ITEM-114` |
| AC-04 | Dependency review is explicit and does not turn every navigation link into an obligation. | candidate / needs prototype | `ITEM-89`, `ITEM-105` |
| AC-05 | AI transfer expansion does not mutate saved Markdown and reports unresolved targets. | candidate / needs prototype | `ITEM-107` |
| AC-06 | No custom editor, object runtime, App Memory or Semantic Home is required by the baseline. | accepted current | item reconciliation |
| AC-07 | Retired and deferred meanings remain traceable. | accepted current | current and retired registers |

## 4. Boundaries And Non-Goals

### Included

- Planning Item reconciliation and one Planning Draft;
- ordinary Markdown/Git/GitHub/local-editor workflow;
- stable file/heading links;
- minimal optional metadata;
- proportional small-tool ideas;
- explicit diff review and permission boundaries.

### Excluded From Current Baseline

- monolithic Documentation Workbench application shell;
- custom Markdown editor;
- managed Reference Object runtime;
- App Memory as a canonical owner;
- Semantic Home and definition-location lifecycle;
- persisted full-text/bare managed-reference modes;
- automatic downstream semantic rewrites;
- mandatory detailed Scenario/Domain/Slice artifacts.

These exclusions do not erase deferred historical ideas.

## 5. Current Reality

The repository already contains reusable planning methodology, a source-linked project register, GitHub-readable Markdown, a reference-link experiment and ordinary Git review/package workflows.

The project-local area still contains old Full Picture, managed-object and detailed Scenario owners. Batch 3A replaces active local planning ownership. Batch 3B will audit and retire the detailed Scenario workspace and then align root/projection routes.

## 6. Planning Item Map

| Group | Planning Items | Role |
|---|---|---|
| Repository-native foundation | `ITEM-28B`, `ITEM-23B`, `ITEM-34B` | durable workspace and change flow |
| Stable references | `ITEM-114`, `ITEM-105`, `ITEM-89` | navigation, optional metadata and affected-use review |
| Planning lifecycle | `ITEM-98`, `ITEM-99` | planning-to-repository and Implementation Idea boundary |
| Early delivery | `ITEM-100` | select one small useful tool before broad architecture |
| AI transfer | `ITEM-107` | non-mutating bounded expansion |
| Independent capabilities | `ITEM-121`, `ITEM-123`, `ITEM-124` | composer, project-readable config and linked notes |
| Reusable planning support | `ITEM-94`, `ITEM-110`, `ITEM-41`, `ITEM-112`, `ITEM-113`, `ITEM-119`, `ITEM-120`, `ITEM-122` | reusable methodology and traceability |
| Deferred alternatives | see current register | preserved but not selected |
| Retired meanings | [`retired-planning-items.md`](retired-planning-items.md) | historical trace only |

## 7. Scenario Coverage

Detailed Scenario files are not selected as a continuing planning layer. The following high-level Scenarios preserve the useful trigger-to-result coverage needed for current planning.

| Scenario | Actor/context | Goal | Observable result | Related items |
|---|---|---|---|---|
| Structure complex source | user preparing a long message | preserve literal meaning while making fragments addressable | one usable structured message | `ITEM-121`, `ITEM-122` |
| Form and reconcile planning meaning | user/AI with source and repository context | obtain accepted canonical Planning Items and a current plan | reviewed items and updated Planning Draft | `ITEM-94`, `ITEM-98`, reusable-linked items |
| Edit repository documentation | contributor using local editor, replacement package or GitHub | change ordinary Markdown safely | complete files and reviewable Git diff | `ITEM-28B`, `ITEM-23B`, `ITEM-34B` |
| Navigate related meaning | reader in any repository folder | open a stable file or section target | target opens through a portable relative link | `ITEM-114` |
| Review affected uses | contributor changes an explicitly depended-on target | find and resolve review obligations | confirmed, updated, removed/replaced or unresolved uses | `ITEM-89`, `ITEM-105` |
| Produce AI transfer copy | user selects a file or section | provide explicitly includable linked context to AI | bounded temporary expanded copy | `ITEM-107` |
| Work with a note | user records standalone or target-related information | keep durable linked note content | discoverable Markdown note and links | `ITEM-124` |
| Change a helper convention | maintainer changes a non-hardcoded tool value | keep configuration controlled and readable | validated project-readable configuration | `ITEM-123` |

Batch 3B must compare every detailed Scenario/DATA/Behavior meaning against this table and the resulting item bodies before deletion.

## 8. Full Picture Matrix — Optional Current View

| Flow point | User/solution view | Implementation view | Questions / risks |
|---|---|---|---|
| Repository workspace | ordinary Markdown and Git | existing editor/GitHub/local Git | portability and GitHub availability |
| Navigation | file/heading links | standard relative paths and explicit anchors | anchor convention |
| Impact review | explicit review obligation | Reference Impact Checker idea | syntax and false positives |
| AI transfer | temporary expanded copy | Transfer Expander idea | recursion, unresolved targets |
| Notes | standalone or linked Markdown | optional helper/index | whether search alone is sufficient |
| Planning | items → Planning Draft → file plan/diff | existing reusable routes | root/projection migration |

This matrix is a view, not a separate canonical artifact.

## 9. Alternatives

| Option | Current disposition | Reason |
|---|---|---|
| Existing editor + Markdown/Git only | baseline | lowest new maintenance cost |
| Existing editor + small local scripts/CLI | preferred candidate | adds missing behavior proportionally |
| GitHub Action or hosted integration | later alternative | depends on remote availability and security/latency needs |
| Browser micro-app | open Implementation Idea | useful only for a clear independent workflow |
| Monolithic custom Workbench | deferred alternative | high coordination and maintenance cost before missing behaviors are proven |
| No new tool | valid per capability | use when existing links/search/review are sufficient |

## 10. Implementation Ideas

| Idea | Target | Status | Minimum prototype |
|---|---|---|---|
| Reference Impact Checker | `ITEM-89` | Working / Needs Prototype | scan explicit review metadata for changed targets and list affected use sites |
| AI Transfer Expander | `ITEM-107` | Working / Needs Prototype | expand selected include relations without changing saved Markdown |
| Structured Message Composer | `ITEM-121` | independently useful candidate | preserve literal text and addressable structure |
| Notes helper/index | `ITEM-124` | deferred | compare with ordinary Markdown search and links |

## 11. Questions, Risks And Decisions

### Questions

1. Exact metadata syntax for review and include relations.
2. Stable anchor convention and validation.
3. First micro-tool selection.
4. Local-only versus GitHub-assisted execution boundary.
5. Whether linked Notes need a dedicated helper.

### Risks

- hidden metadata may become hard to maintain;
- anchors may be renamed without validation;
- a small tool may expand into a new platform;
- GitHub-specific behavior may reduce local portability;
- retiring Scenario details before coverage audit may lose meaning.

### Decisions

- Planning Draft is the sole active high-level owner.
- Detailed SDS profile is not selected for this solution now.
- Existing app-heavy architecture is deferred, not silently erased.
- No implementation is accepted by this Draft alone.

## 12. Selected Planning Depth

| Layer | Selection | Reason |
|---|---|---|
| Planning Items | yes | complete source-linked canonical meanings |
| Planning Draft | yes | one high-level coordination owner |
| Scenario summaries | inline | enough for current direction and deletion audit |
| Detailed Scenario/DATA/Behavior | not selected | additional layer does not currently justify its coordination cost |
| Domain | no | no separate domain model needed yet |
| Slice | no | implementation not selected |
| Prototype | only for chosen helper | evidence needed before architecture |

## 13. Repository Handoff

```text
accepted Batch 3A files
  → full diff review
  → commit/push by separate permission
  → Batch 3B Scenario coverage audit and root/projection alignment.
```

This Planning Draft does not authorize repository edits, implementation, commit or push.
