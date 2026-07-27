# Linked Notes Prototype Check Record

Status: unexecuted template
Prototype version: `0.2.2-prototype`

Use one copy for one concrete browser/repository test run. Never record token values.

## 1. Environment

| Field | Value |
|---|---|
| Date/time | |
| Tester | |
| Browser/version | |
| Tampermonkey/version | |
| ChatGPT origin | `chatgpt.com` / `chat.openai.com` |
| Userscript SHA-256 | |
| Commit/ref containing tested source | |
| Test repository A | |
| Test branch A | |
| Notes folder A | `prototype-fixtures/linked-notes` |
| Test repository B | |
| Test branch B | |
| Notes folder B | |
| Chat A URL/identifier, without private content | |
| Chat B URL/identifier, without private content | |

## 2. Automated Preflight

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 1 | Run `node verify-linked-notes.mjs`. | All 76 tests pass; source syntax, generated syntax and generated freshness pass. | |
| 2 | Record the generated userscript SHA-256. | One stable hash is available for the tested build. | |
| 3 | Install the complete generated userscript and reload ChatGPT. | Tampermonkey reports `0.2.2-prototype`; one `Notes` launcher appears. | |

## 3. Launcher, Theme And Draft Close

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 4 | Compare Notes with existing right-edge OBS launchers. | Notes is shifted left by approximately its own width plus a gap and is not hidden. | |
| 5 | Open Notes in dark ChatGPT. | Panel, controls, status and manager use a readable dark theme. | |
| 6 | Create a Note, type title/body without Save local, then press `Escape`. | Note draft persists and the panel closes. | |
| 7 | Reopen Notes. | Exact title/body from step 6 remains. | |
| 8 | In `New workspace`, type all four form fields, press `Escape`, then reopen. | Unsaved workspace-form values remain exactly as typed. | |
| 9 | With a dirty workspace form, trigger a harmless status rerender such as saving the shared token. | Workspace-form values remain unchanged. | |
| 10 | Start a deliberately slow remote request and press `Escape`. | Panel remains open until the operation completes; no second operation starts. | |

## 4. Workspace Creation And Shared Token

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 11 | Create Workspace A using a full `https://github.com/owner/repo` URL. | URL is accepted; owner/repository are parsed; target preview is correct. | |
| 12 | Create Workspace B using `owner/repository`. | Compact format is accepted; both workspaces appear. | |
| 13 | Try a non-GitHub URL, repository subpage URL and `owner` without `/repo`. | Each invalid value is rejected before becoming a target. | |
| 14 | Save one shared fine-grained token. | UI reports one shared token stored; value is not displayed again. | |
| 15 | Switch A → B → A and reload. | Both workspaces persist; token is not re-entered. | |
| 16 | Set Workspace A as default. | Default marker moves to A and survives reload. | |
| 17 | Edit a workspace form without saving, then select another workspace and cancel discard. | Selection is cancelled and the dirty form remains. | |
| 18 | Repeat and confirm discard. | Selected workspace opens and the old unsaved form is cleared explicitly. | |

## 5. Per-Chat Workspace Memory

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 19 | Open an unmapped stable Chat A without touching the workspace selector. | Default Workspace A is displayed, but status says it is not saved for this chat. | |
| 20 | Inspect `chatWorkspaceMap`. | Chat A has no entry merely because it was opened. | |
| 21 | Explicitly select Workspace A in Chat A. | Chat A receives an A binding. | |
| 22 | Open stable Chat B and explicitly select Workspace B. | Chat B receives B; Chat A remains A. | |
| 23 | Navigate back to Chat A without reload. | Current drafts persist and Workspace A is restored. | |
| 24 | Navigate again to Chat B. | Workspace B is restored. | |
| 25 | Reload Chat A and Chat B separately. | Each stable chat restores its explicit workspace. | |
| 26 | Open a completely new unsaved chat. | Global default A is displayed without a durable chat binding. | |
| 27 | Send the first message without changing workspace and wait for `/c/<id>`. | The new stable chat still has no explicit mapping; it uses default A as fallback. | |
| 28 | Open another new chat, explicitly select B, send the first message and wait for `/c/<id>`. | The stable chat uses default A and has no mapping; the temporary B selection is not promoted automatically. | |
| 29 | From a new-chat route explicitly select B, do not send a message, then open an existing unmapped chat from the sidebar. | The existing chat uses default A, receives no mapping and no remote action targets B. | |

## 6. Two-Tab Concurrency And Refresh

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 30 | Open Chat A and Chat B in two tabs. In parallel, select A in tab A and B in tab B. | Both mappings survive; neither overwrites the other. | |
| 31 | In tab A create Workspace C while tab B changes Chat B mapping. | Workspace C and the Chat B mapping both survive. | |
| 32 | Change default in tab A and create/update a workspace in tab B. | Both completed mutations survive with a higher state revision. | |
| 33 | Inspect private GM keys after the mutations. | `workspaceState.revision` advances; `stateLock` is empty after operations finish. | |
| 34 | Leave tab A open, change Chat A mapping in tab B, then close and reopen Notes in tab A. | Tab A rereads storage and shows the new mapping without page reload. | |
| 35 | Start two tabs simultaneously on a clean v1 profile. | Exactly one deterministic `workspace-imported-v1` record is created. | |

## 7. Workspace Deletion And Migration

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 36 | Create temporary Workspace C and bind it to a disposable chat. | Chat uses C. | |
| 37 | Delete Workspace C. | Only local Workspace C and its chat mappings disappear; Notes and remote files remain. | |
| 38 | Reopen affected chat. | It falls back visibly without creating a new explicit binding. | |
| 39 | On a separate profile with v1 settings/token, install v2. | One Imported workspace appears; old token becomes the shared token; legacy keys remain. | |

## 8. Local Note And Link Checks

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 40 | Create Note A with Unicode and literal Markdown. | Stable local Note exists. | |
| 41 | Close, search, open manager, switch workspace and navigate Notes while editing. | Exact Note draft persists before every rerender/navigation. | |
| 42 | Reload the page. | Note A recovers from IndexedDB. | |
| 43 | Create Note B and link A → B. | Check resolves and Open selects B. | |
| 44 | Add a missing Note target. | It remains visibly unresolved. | |
| 45 | Add same-folder, parent, sibling, nested and `#anchor` repository links. | Valid targets normalize as ordinary Markdown-relative links. | |
| 46 | Add an imported `javascript:` or `data:` URL fixture. | It is rejected and never opened. | |

## 9. GitHub Create, Update And Workspace Safety

Use test branches only.

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 47 | In Chat A / Workspace A, save a new Note A. | Markdown is created at A target, read back exactly and marked `saved_verified`. | |
| 48 | Inspect the repository file. | Ordinary Markdown is readable; no token, chat ID or Workspace record appears. | |
| 49 | Edit Note A and Save GitHub again. | SHA-aware update succeeds and exact read-back verifies. | |
| 50 | Switch Chat A to Workspace B while Note A remains selected. | Bound remote still shows A; normal Save GitHub is blocked as mismatch. | |
| 51 | Press `Copy to chat workspace`. | Only an absent B target is created and verified; old A file remains. | |
| 52 | Try Copy when B target already exists. | Conflict is visible; no overwrite occurs. | |

## 10. Conflict And Recovery

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 53 | Modify a verified remote Note outside the helper, then save stale local content. | Conflict appears; blind overwrite does not occur. | |
| 54 | Press `Recheck remote`. | Different content remains conflict; SHA is not adopted falsely. | |
| 55 | Press `Load remote` and confirm. | A separate local backup is created before replacement. | |
| 56 | Repeat conflict and use confirmed overwrite. | Latest SHA is read first; one explicit verified write succeeds. | |
| 57 | Delete a verified remote file and press normal Save. | State becomes `remote_deleted`; file is not recreated automatically. | |
| 58 | Use confirmed restore/overwrite. | Missing bound target is recreated only after confirmation and verification. | |
| 59 | Simulate successful PUT followed by failed read-back. | `save_failed` retains provisional identity; Save local preserves recovery; later Recheck may verify it. | |

## 11. Secret And Storage Inspection

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 60 | Inspect Note records in `obsLinkedNotesPrototype/notes`. | Note content and remote binding may exist; token and chat map do not. | |
| 61 | Inspect private GM storage. | One canonical `workspaceState` contains workspaces, explicit chat map, default and revision; one shared token, migration record and temporary lock use separate v2 keys. | |
| 62 | Search generated Markdown and repository diff for token fragments and chat IDs. | None are present. | |
| 63 | Verify all Notes remain visible after workspace switching. | Workspace selection does not hide or duplicate Notes. | |

## 12. Findings

### Confirmed evidence

-

### Failures / deviations

-

### Open questions

-

## 13. Verdict

```text
pass / partial / fail / inconclusive
```
