# Linked Notes Prototype Check Record

Status: unexecuted template
Prototype version: `0.5.1-prototype`

Use one copy for one concrete browser/repository test run. Never record token values.

## 1. Environment

| Field | Value |
|---|---|
| Date/time | |
| Tester | |
| Browser/version | |
| Tampermonkey/version | |
| ChatGPT origin | `chatgpt.com` / `chat.openai.com` |
| Viewport width × height and zoom | |
| Userscript SHA-256 | |
| Commit/ref containing tested source | |
| Test repository A | |
| Test branch A | |
| Notes folder A | `prototype-fixtures/linked-notes` |
| Categories folder A | `categories` |
| Test repository B | |
| Test branch B | |
| Notes folder B | |
| Categories folder B | |
| Chat A URL/identifier, without private content | |
| Chat B URL/identifier, without private content | |

## 2. Automated Preflight

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 1 | Run `node verify-linked-notes.mjs`. | All 174 tests pass; source syntax, generated syntax and generated freshness pass. | |
| 2 | Record the generated userscript SHA-256. | One stable hash is available for the tested build. | |
| 3 | Install the complete generated userscript and reload ChatGPT. | Tampermonkey reports `0.5.1-prototype`; one `Docs` launcher appears with Notes / Files / Categories surfaces. | |

## 3. Launcher, Theme And Draft Close

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 4 | Compare Docs with existing right-edge OBS launchers. | Notes is shifted left by approximately its own width plus a gap and is not hidden. | |
| 4a | Open Docs with the S2/timer widget or another bottom-right OBS widget visible. | On a wide viewport, Notes reserves bottom-right space and no overlay covers its content. | |
| 4b | Reduce the viewport height until Links and workspace settings no longer fit at once. | The editor gains an internal scrollbar; the bottom content remains reachable without scrolling the ChatGPT page. | |
| 4c | Add enough Notes to exceed the sidebar height. | The Note list scrolls independently while status remains reachable. | |
| 4d | Press the top-bar `Manage workspaces` button from the top of the editor. | The manager opens and is scrolled into view without losing the Note or workspace drafts. | |
| 4e | Resize the browser while Notes is open. | Panel dimensions and safe area update; controls remain inside the viewport. | |
| 5 | Open Docs in dark ChatGPT. | Panel, controls, status and manager use a readable dark theme. | |
| 6 | Create a Note, type title/body without Save local, then press `Escape`. | Note draft persists and the panel closes. | |
| 7 | Reopen Notes. | Exact title/body from step 6 remains. | |
| 8 | In `New workspace`, type all five form fields, press `Escape`, then reopen. | Unsaved workspace-form values remain exactly as typed. | |
| 9 | With a dirty workspace form, trigger a harmless status rerender such as saving the shared token. | Workspace-form values remain unchanged. | |
| 10 | Start a deliberately slow remote request and press `Escape`. | Panel remains open until the operation completes; no second operation starts. | |


## 4. GitHub Folder Refresh And Remote Change Reconciliation

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 10a | Save Workspace A with a Notes folder that does not yet exist, without saving a Note. | No remote file or placeholder is created. | |
| 10b | Save the first Note explicitly to that workspace. | The complete parent path and Markdown file appear together and read-back verification succeeds. | |
| 10c | Create a valid `obs-linked-note:v1` Markdown Note directly on GitHub in the Notes folder, then press `Refresh GitHub`. | The remote-only Note is imported into the local list/search with exact target, SHA and verified hash. | |
| 10d | Place ordinary Markdown in the same folder and refresh. | It is counted as skipped and is not converted into a Note. | |
| 10e | Change a verified Note only on GitHub and refresh while local content is unchanged. | The local Note fast-forwards to the remote content and current SHA. | |
| 10f | Change a verified Note only locally and refresh. | Local content remains; summary reports local ahead; no PUT occurs. | |
| 10g | Change the same verified Note differently both locally and on GitHub, then refresh. | Local content is preserved and the Note enters explicit conflict. | |
| 10h | Delete a bound Note file on GitHub and refresh. | Local content remains and state becomes `remote_deleted`. | |
| 10i | Open/close Notes, navigate chats and switch workspaces without pressing Refresh GitHub. | No Notes-folder listing or background remote read occurs. | |
| 10j | Configure an invalid/inaccessible branch and refresh. | Explicit repository/branch failure; it is not reported as an empty folder. | |


## 4A. Repository File Browser

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| F1 | Open `Files` and press `Browse root`. | Direct root entries load through GET only; folders appear before files. | |
| F2 | Navigate root → nested folder → parent using breadcrumbs and Up. | Each explicit action reads only the selected direct directory. | |
| F3 | Open a Markdown, JSON, source-code or text file smaller than 512 KiB. | Literal read-only content, path, size and SHA appear inside the app. | |
| F4 | Press `Open on GitHub`. | Exact owner/repository/branch/path opens in a new browser tab. | |
| F5 | Open a binary or unsupported fixture. | No corrupted text appears; metadata and Open on GitHub remain available. | |
| F6 | Open a listed text fixture larger than the preview limit while recording network calls. | Explicit too-large state appears; no content GET is made and no truncated content is presented as complete. | |
| F7 | Open a repository link from a Note. | The target opens in the Files surface; GitHub remains available as a separate action. | |
| F8 | Open/close Docs, switch chats and workspaces without browsing. | No background repository listing or file read occurs. | |

## 4B. Repository File Categories

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| C1 | Set a Categories folder in the workspace and save it. | Existing workspaces default safely to `categories`; no remote write occurs. | |
| C2 | Open Categories and press `Refresh categories` when the folder is absent. | Empty category list appears only after repository/branch access is verified. | |
| C3 | Create `Programming` with a description containing literal headings `## Files` and `## Implied categories`. | A v3 definition is created; the full description survives refresh and exact read-back verification. | |
| C4 | Create `ASP.NET Core`, set `Programming` as an implicit category and add a local UX group. | Definition links to Programming; UX group remains only in private local cache. | |
| C5 | Select a repository file in Files, return to ASP.NET Core and press `Assign selected file`. | One portable visible link is added under `## Files`; target file is not modified. | |
| C6 | Open ASP.NET Core. | File appears as `explicit`. | |
| C7 | Open Programming. | Same file appears as `derived`; reason is distinguishable from explicit membership. | |
| C8 | Remove the file from ASP.NET Core. | Link is removed through SHA-aware verified update; derived Programming membership disappears. | |
| C9 | Clear local category cache, then refresh. | Names, descriptions, relations, validation states and memberships rebuild from GitHub. | |
| C10 | Edit a category definition externally, then submit stale local changes. | Conflict is visible; no blind overwrite occurs. | |
| C11 | Create malformed definitions, broken category/file links and an implication cycle fixture. | Every issue shows the responsible path/reason; traversal terminates safely. | |
| C12 | Inspect categorized files. | No file-local category marker was added by this prototype. | |
| C13 | Inspect network calls during browse/refresh. | Browse and refresh are GET-only; only explicit category create/edit/assign/unassign uses PUT. | |
| C14 | Load categories in Chat A / Workspace A, then navigate to Chat B / Workspace B. | Repository preview and selected category from A clear immediately; only B cache appears and no stale A write is possible. | |
| C15 | Delete the active Workspace B while its category is selected. | Safe fallback workspace cache replaces B; stale B category actions are blocked. | |
| C16 | In two tabs, refresh definitions while changing local groups for the same workspace. | Both the newest definition snapshot and group update survive; lock/revision keys settle cleanly. | |
| C17 | Open a legacy v1 category definition and save an intentional edit. | It remains readable and the explicit save upgrades it to deterministic v3 without losing description or links. | |
| C18 | Edit one workspace in place so owner/repository/branch or Categories folder changes while its ID remains stable. | Old preview/category/cache clears; writes remain blocked until explicit refresh of the new target. | |
| C19 | In two stale tabs assign different local groups to two different category IDs. | Both group assignments survive because each mutation rereads and changes one category under the lock. | |
| C20 | Open a file from a Note bound to repository A while Categories uses repository B. | Assign selected file is disabled and the app rejects a direct cross-repository assignment call. | |
| C21 | Assign files named `foo(bar).md`, `a b.md`, `name[1].md`, a Unicode name and a name containing `%`. | Encoded visible links survive save, refresh and GitHub rendering without losing membership. | |
| C22 | Refresh a category containing many valid member links while recording requests. | Validation lists bounded parent directories; it does not fetch or decode each member file body. | |
| C23 | Browse a folder and click an oversized listed file through the actual rendered entry button. | Size metadata survives the UI event and no file-content request occurs. | |

## 5. Workspace Creation And Shared Token

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

## 6. Per-Chat Workspace Memory

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

## 7. Two-Tab Concurrency And Refresh

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 30 | Open Chat A and Chat B in two tabs. In parallel, select A in tab A and B in tab B. | Both mappings survive; neither overwrites the other. | |
| 31 | In tab A create Workspace C while tab B changes Chat B mapping. | Workspace C and the Chat B mapping both survive. | |
| 32 | Change default in tab A and create/update a workspace in tab B. | Both completed mutations survive with a higher state revision. | |
| 33 | Inspect private GM keys after the mutations. | `workspaceState.revision` advances; `stateLock` is empty after operations finish. | |
| 34 | Leave tab A open, change Chat A mapping in tab B, then close and reopen Notes in tab A. | Tab A rereads storage and shows the new mapping without page reload. | |
| 35 | Start two tabs simultaneously on a clean v1 profile. | Exactly one deterministic `workspace-imported-v1` record is created. | |

## 8. Workspace Deletion And Migration

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 36 | Create temporary Workspace C and bind it to a disposable chat. | Chat uses C. | |
| 37 | Delete Workspace C. | Only local Workspace C and its chat mappings disappear; Notes and remote files remain. | |
| 38 | Reopen affected chat. | It falls back visibly without creating a new explicit binding. | |
| 39 | On a separate profile with v1 settings/token, install v2. | One Imported workspace appears; old token becomes the shared token; legacy keys remain. | |

## 9. Local Note And Link Checks

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 40 | Create Note A with Unicode and literal Markdown. | Stable local Note exists. | |
| 41 | Close, search, open manager, switch workspace and navigate Notes while editing. | Exact Note draft persists before every rerender/navigation. | |
| 42 | Reload the page. | Note A recovers from IndexedDB. | |
| 43 | Create Note B and link A → B. | Check resolves and Open selects B. | |
| 44 | Add a missing Note target. | It remains visibly unresolved. | |
| 45 | Add same-folder, parent, sibling, nested and `#anchor` repository links. | Valid targets normalize as ordinary Markdown-relative links. | |
| 46 | Add an imported `javascript:` or `data:` URL fixture. | It is rejected and never opened. | |

## 10. GitHub Create, Update And Workspace Safety

Use test branches only.

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 47 | In Chat A / Workspace A, save a new Note A. | Markdown is created at A target, read back exactly and marked `saved_verified`. | |
| 48 | Inspect the repository file. | Ordinary Markdown is readable; no token, chat ID or Workspace record appears. | |
| 49 | Edit Note A and Save GitHub again. | SHA-aware update succeeds and exact read-back verifies. | |
| 50 | Switch Chat A to Workspace B while Note A remains selected. | Bound remote still shows A; normal Save GitHub is blocked as mismatch. | |
| 51 | Press `Copy to chat workspace`. | Only an absent B target is created and verified; old A file remains. | |
| 52 | Try Copy when B target already exists. | Conflict is visible; no overwrite occurs. | |

## 11. Conflict And Recovery

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 53 | Modify a verified remote Note outside the helper, then save stale local content. | Conflict appears; blind overwrite does not occur. | |
| 54 | Press `Recheck remote`. | Different content remains conflict; SHA is not adopted falsely. | |
| 55 | Press `Load remote` and confirm. | A separate local backup is created before replacement. | |
| 56 | Repeat conflict and use confirmed overwrite. | Latest SHA is read first; one explicit verified write succeeds. | |
| 57 | Delete a verified remote file and press normal Save. | State becomes `remote_deleted`; file is not recreated automatically. | |
| 58 | Use confirmed restore/overwrite. | Missing bound target is recreated only after confirmation and verification. | |
| 59 | Simulate successful PUT followed by failed read-back. | `save_failed` retains provisional identity; Save local preserves recovery; later Recheck may verify it. | |

## 12. Secret And Storage Inspection

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| 60 | Inspect Note records in `obsLinkedNotesPrototype/notes`. | Note content and remote binding may exist; token and chat map do not. | |
| 61 | Inspect private GM storage. | One canonical `workspaceState` contains workspaces, explicit chat map, default and revision; one shared token, migration record and temporary lock use separate v2 keys. | |
| 62 | Search generated Markdown and repository diff for token fragments and chat IDs. | None are present. | |
| 63 | Verify all Notes remain visible after workspace switching. | Workspace selection does not hide or duplicate Notes. | |

## 13. Findings

### Confirmed evidence

-

### Failures / deviations

-

### Open questions

-

## 14. Verdict

```text
pass / partial / fail / inconclusive
```


## 4C. Note Categories And Multi-Target Category Creation

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| NC1 | Create a local Note and select two categories before its first GitHub save. | Note body and category intent persist locally; no category definition contains an unresolved local-only Note path. | |
| NC2 | Save the Note to GitHub. | Note is verified first; each selected category definition is then updated and verified. | |
| NC3 | Edit a verified Note and change its category selection. | Added/removed memberships appear only in affected definitions; Note body is not modified by assignment. | |
| NC4 | Create a category and choose multiple files and verified Notes in the picker. | One v3 definition is written with separate Files and Notes regions and exact read-back verification. | |
| NC5 | Force one membership conflict during a multi-category Note save. | Verified Note remains saved; completed/pending/failed category rows are visible and category intent remains retryable. | |
| NC6 | Select Note categories, then open/edit/save the Note before category refresh or after a failed refresh. | Previously selected unavailable category IDs remain visible and are not replaced with an empty list. | |
| NC6 | Force category-create failure after entering every field and selecting targets. | ID/name/description/implies/group and all selected targets remain intact in the form. | |

## 4D. Target Picker And Bounded Search

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| TP1 | Open `Choose files or Notes` from a Note. | Files, Notes and Selected tabs appear; no write occurs. | |
| TP2 | Search a filename at Current folder, depth 1, depth 3 and Entire repository. | Results respect depth; deep matches appear only at sufficient depth. | |
| TP3 | Reach a folder/request/result bound. | The result is marked incomplete/truncated; prior selected targets remain. | |
| TP4 | Search Notes by title. | Matching behavior agrees with the existing Notes search. | |
| TP5 | Select several files/Notes, change tabs/query and apply. | Selection survives; visible Markdown links and managed metadata are created once without duplicates. | |
| TP6 | Attempt a category or relative managed link to another repository/branch. | The operation is blocked with a contextual explanation. | |

## 4E. Rich Markdown And Repository Images

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| RM1 | Open a Markdown file and switch Rendered ↔ Source. | Rich view and exact source are both available; source remains read-only. | |
| RM2 | Open a Note and switch Edit / Preview / Split while changing unsaved text. | No text is lost and no automatic remote save occurs. | |
| RM3 | Render headings, emphasis, lists, task lists, tables, blockquotes and code fences. | Safe expected HTML is shown; code is never executed. | |
| RM4 | Render a private repository image using Markdown image syntax. | Image loads through authenticated GitHub requests and a temporary object URL; token is absent from DOM/URL. | |
| RM5 | Render an allowlisted `<img src="…" alt="…" width="…">`. | Image loads; event attributes and style are removed. | |
| RM6 | Render `<img onerror>`, `<script>`, `javascript:` and unsafe data/blob inputs. | No script/event executes; unsafe targets are blocked or escaped. | |
| RM7 | Close/switch document/workspace after loading images. | Temporary object URLs are revoked. | |
| RM8 | Use an external image URL. | It is not loaded automatically; source remains available. | |
| RM9 | Open rendered links/images whose Markdown destinations contain `%20`, encoded parentheses/brackets, Unicode and `%25`. | The exact decoded repository path opens; malformed `%` and encoded traversal/separators are rejected contextually. | |
| RM10 | Keep a Note Preview image visible, then render a Markdown file with another image and return to the Note. | File rendering does not revoke the Note image URL; each surface keeps an independent media lifecycle. | |
| RM11 | Leave each rendered mode, switch workspace and unload/reinstall the userscript after image loading. | Related object URLs are revoked and no stale rendered projection reuses revoked URLs. | |

## 4F. Contextual Errors And Relation Recovery

| Step | Action | Expected result | Result / evidence |
|---:|---|---|---|
| ER1 | Trigger a Note, File, Category and picker error. | A high-contrast readable error appears with the failed surface/action, not only in the bottom sidebar. | |
| ER2 | Dismiss an error. | The message closes without clearing the form, Note body or picker basket. | |
| ER3 | Create picker-managed links, clear local Note cache/index and run explicit GitHub refresh. | Outgoing managed links rebuild from Note metadata. | |
| ER4 | Open the target Note. | `Linked from` shows derived source Notes without target-side backlink writes. | |
| ER5 | Delete or rename a target externally. | Unresolved relation remains visible; no silent metadata/body deletion occurs. | |
