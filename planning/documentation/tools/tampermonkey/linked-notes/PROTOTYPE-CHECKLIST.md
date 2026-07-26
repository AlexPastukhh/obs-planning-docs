# Linked Notes Prototype Check Record

Status: unexecuted template
Prototype version: `0.1.3-prototype`

Use one copy of this checklist for one concrete browser/repository test run. Do not enter credentials or token values.

## 1. Environment

| Field | Value |
|---|---|
| Date/time | |
| Browser/version | |
| Tampermonkey/version | |
| ChatGPT origin | `chatgpt.com` / `chat.openai.com` |
| Test repository | |
| Test branch | |
| Test base path | `prototype-fixtures/linked-notes` |
| Userscript SHA-256 | |
| Commit/ref containing tested source | |

## 2. Automated Checks

| Check | Result | Evidence |
|---|---|---|
| `node verify-linked-notes.mjs` | pass / fail | |
| source syntax | pass / fail | |
| unit tests | pass / fail | |
| generated userscript current | pass / fail | |

## 3. Local-Only Browser Checks

| Step | Expected | Result / evidence |
|---|---|---|
| Open/close panel | panel remains usable | |
| Create titled Note A | stable local Note exists | |
| Create untitled Note | valid Note exists | |
| Type without Save local, close/reopen panel | exact title/body draft remains | |
| Type, then search | exact title/body persists before rerender | |
| Type, then save settings | exact title/body persists before rerender | |
| Type, then switch Notes | old Note draft persists before navigation | |
| Status/error rerender while editing | exact title/body remains | |
| Reload after debounced draft persistence | body/title recover exactly | |
| Search title/body | concrete Notes returned | |
| Create Note B and link A → B | link resolves and opens B | |
| Missing Note target | unresolved remains visible | |
| Delete local Note | local record removed; no remote deletion | |

## 4. Repository Target Checks

| Step | Expected | Result / evidence |
|---|---|---|
| Same-folder file | resolves | |
| Parent/sibling/nested file | resolves | |
| Existing explicit anchor | resolves | |
| Missing explicit anchor | unresolved; no fuzzy repair | |
| Machine-local absolute path | rejected | |
| Portable HTTP(S) URL | accepted as external URL | |
| Imported `javascript:`, `data:` or other non-HTTP(S) URL | rejected and never opened | |

## 5. GitHub Save Checks

| Step | Expected | Result / evidence |
|---|---|---|
| Save new Note A | file created on configured test branch/path | |
| Read-back A | exact expected content and complete owner/repository/branch/path identity verified | |
| Save new Note B | file created and verified | |
| Update unchanged-base A | SHA-aware update succeeds | |
| Edit remote A outside prototype | remote SHA changes | |
| Change configured repository/branch/path | regular Save blocks before write and requires explicit Copy | |
| Copy to an absent current target | copy verifies, rebinds local Note and leaves old remote untouched | |
| Copy to an existing target | conflict; no overwrite | |
| Delete verified remote file | `remote_deleted`; no automatic recreation | |
| Save stale local A | conflict; no blind overwrite | |
| Network result unknown simulation/observation | read remote before deciding success | |
| Read-back mismatch simulation | explicit verification failure | |
| Token absent/invalid | explicit auth failure; local body preserved | |
| Permission insufficient | explicit permission failure | |

## 6. Security And Boundary Checks

| Check | Result / evidence |
|---|---|
| Token absent from Markdown | |
| Token absent from IndexedDB Note records | |
| Token absent from console/test output | |
| No background repository writes | |
| Repository/branch/path visibly configured | |
| Bound target remains visible during recovery even when settings differ | |
| Remote operation lock disables editor/navigation/settings | |
| Local state distinct from verified remote state | |
| Save local preserves conflict/remote-deleted/verification-unknown recovery state | |
| Unknown codec `extra` metadata survives load/store/re-encode | |
| Verified remote identity includes owner/repository/branch/path/SHA/hash | |
| Link Check alone does not mark durable content changed | |
| Body round-trip preserves 0/1/2/3 trailing newlines and CRLF policy | |
| No generic Reference Object/category runtime introduced | |

## 7. Findings

### Confirmed evidence

-

### Failures

-

### Inconclusive results

-

### Implementation changes suggested by evidence

-

### Decisions still requiring explicit review

-

## 8. Verdict

```text
pass / partial / fail / inconclusive
```

Rationale:

-

Next safe action:

-
