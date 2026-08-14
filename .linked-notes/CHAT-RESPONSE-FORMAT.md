# Linked Notes Chat Response Format

Status: active Reader-format contract / automatic supported ChatGPT-to-Linked-Notes handoff not implemented
Scope: authoring conventions for a response that is explicitly intended to be transferred into OBS Linked Notes Reader. This file does not define Reader runtime internals or the future transport mechanism.

## 1. When This Applies

Use this contract only when a response is intended for Linked Notes Reader.

Current transfer status:

```text
Reader safe Markdown rendering
  = active;

manual Paste Markdown into Reader
  = current reliable explicit transfer;

current DOM-derived Open in Reader
  = existing prototype implementation evidence;
  = derived, not exact source;
  = not the selected long-term handoff architecture;

supported automatic ChatGPT → Linked Notes handoff
  = not implemented / mechanism not selected.
```

Do not assume that writing Reader-compatible Markdown causes the normal ChatGPT conversation to be transferred automatically into Linked Notes.

## 2. Supported Collapsible Block

Use:

```html
<details>
<summary>More</summary>

Markdown body

</details>
```

The boolean `open` attribute is also supported:

```html
<details open>
<summary>Shown initially</summary>

Markdown body

</details>
```

## 3. Formatting Rules

- `summary` may contain the Reader's existing safe inline Markdown.
- The body may contain ordinary supported Markdown such as headings, paragraphs, lists, emphasis and code.
- `open` is the only supported `details` attribute in the current format.
- Do not add event handlers, style attributes or arbitrary active HTML.
- Nested `<details>` are not supported in the current Reader slice.
- Malformed/unclosed/nested forms may remain inert literal content instead of becoming collapsible UI.
- Put examples of `<details>` syntax inside fenced code when they should remain examples rather than active Reader blocks.

## 4. Transport Boundary

This contract owns **how a Reader-targeted response may be formatted**, not how ChatGPT sends that response to Linked Notes.

The project does not currently select programmatic extraction from the ChatGPT page/UI as the target transport architecture. The future automatic path should use an explicit supported handoff in which response content is supplied across an integration boundary without Linked Notes scraping it from the ChatGPT UI. The concrete mechanism remains an open development decision.

Until that exists, manual Paste Markdown is the reliable explicit path for exact Reader input.

## 5. Related Agent Contracts

Start from [`AGENT-GUIDE.md`](AGENT-GUIDE.md) for the complete registry of Linked Notes features that can affect content authoring.
