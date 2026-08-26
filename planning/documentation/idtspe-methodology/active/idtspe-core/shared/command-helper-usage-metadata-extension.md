# Command Helper Usage Metadata Extension

Status: active implementation contract for the existing Tampermonkey / chat-command-palette helper

## Purpose

Extend the existing command-helper UI so a user can inspect, without invoking a command:

```text
When / why should I use this command?
What does this command give me?
```

This is **presentation/navigation metadata only**.

It must not create a second semantic owner and must not change command routing, command text, permission mode, owner discovery, execution, catalog ordering or IDTSPE Target semantics.

## Backward-Compatibility Rule

The extension must be additive over the existing helper implementation.

```text
existing command definition without new metadata
→ remains valid
→ remains visible/invokable exactly as before

new command definition with helper metadata
→ same invocation behavior
→ richer inspectable UI
```

Do not require a mass migration of existing commands before the helper can be upgraded.

Do not change the meaning of existing `schemaVersion: 1` command definitions merely to add presentation metadata. The parser/validator may recognize an additional optional field while preserving all existing required fields and behavior.

## Canonical Optional Command Metadata

Preferred command-definition projection:

```json
{
  "helperPresentation": {
    "whenToUse": "<short reason / situation in which this command is useful>",
    "whatYouGet": "<short concrete result produced by the command>"
  }
}
```

Both fields are presentation strings.

They are not routing triggers and are not executable prompt text.

### `whenToUse`

Answer in user language:

```text
What situation makes this command the right next action?
```

Good examples:

```text
Use after one Domain owner is selected and you need its isolated business-rule proof plan before Slice Strategy.

Use when a Slice semantic contract exists and you need to plan the integration proof of its orchestration, including a TDD-first route.

Use when the global product Evolution Map exists but its consequences for Workspace structure and future change paths have not yet been interpreted.
```

Avoid generic restatement such as:

```text
Use this command to plan tests.
```

### `whatYouGet`

Answer:

```text
What concrete planning result / owner / decision state will exist after a successful invocation?
```

Example:

```text
A Test Design for the selected Domain owner: proof properties, default unit-test allocation, setup/action/assertions, escape/refactor risks and Artifact Placement / next-step guidance.
```

This is intentionally shorter and more user-facing than the full `expectedOutput` contract.

## Relationship To Existing Metadata

Existing command definitions already contain fields such as:

```text
description
meaning
activeContextBehavior
expectedOutput
permissionMode
```

Semantic/helper projections may also already contain:

```text
trigger
result
```

Do not replace those fields.

Use this precedence only for **helper presentation**:

```text
whenToUse:
  command.helperPresentation.whenToUse
  → linked semantic projection trigger when available
  → no synthetic reason

whatYouGet:
  command.helperPresentation.whatYouGet
  → linked semantic projection result when available
  → command.expectedOutput when available
  → command.description as last presentation fallback
```

The helper must not invent a `whenToUse` from `activeContextBehavior`, because active-context behavior is not necessarily the reason to invoke a command.

## UI Projection

The existing command row/button remains the primary invocation control.

Add a non-destructive inspection surface.

Recommended behavior:

```text
Desktop:
  hover/focus may show compact summary

All platforms:
  explicit info/details button opens/toggles command commentary
```

Suggested commentary:

```text
When to use
  <whenToUse>

What you get
  <whatYouGet>
```

The explicit info/details control is required even if hover is implemented, because hover is not reliable on touch/mobile interfaces.

## Interaction Guards

```text
click command row/button
→ existing invocation behavior

click info/details
→ show/hide metadata only
→ MUST NOT invoke/insert/send command

keyboard focus + details activation
→ same non-invoking behavior
```

Opening commentary must not change selected command, current search query, catalog order or navigation state unless the existing UI already has a harmless selection model.

## Search / Ranking Rule

By default the new metadata is **not** part of command matching/ranking.

Reason:

```text
presentation prose
≠ command aliases
```

If later search-through-description is desired, make it a separate explicit helper feature rather than silently changing command discovery semantics.

## Generation / Projection Rule

When command seeds are generated from `planning/commands/*.command.md`:

```text
helperPresentation present
→ preserve it verbatim in generated command seed

helperPresentation absent
→ omit it; do not generate guessed text
```

Use-Case / semantic projections keep their existing `trigger` / `result` fields and may provide fallback presentation at runtime.

## IDTSPE Command Requirement

For **new canonical/focused commands created for the IDTSPE Target Module command surface**, our methodology requires explicit helper commentary even though the underlying helper field is optional for backward compatibility.

Each new IDTSPE command plan should therefore specify:

```text
Command ID / phrase
Methodology route
When To Use
What You Get
Target argument/scope when applicable
Gate / no-target outcome when applicable
```

Focused aliases that genuinely have a different user intent may have different `whenToUse` / `whatYouGet` even when they route to the same Target Module.

Example:

```text
Command:
  спланируй тесты домена <owner>

Route:
  TM-TEST-DESIGN

When To Use:
  selected Domain owner has stable enough semantics and its isolated business/domain proof should be planned, normally before Slice Strategy.

What You Get:
  per-Domain Test Design with unit-test-oriented proof allocation, assertions/risks, placement and methodology next step.
```

## Implementation Extension Points

The existing helper implementation should be extended at its existing boundaries rather than rewritten:

```text
command-definition codec / validator
  + optional helperPresentation

seed generator
  + preserve optional metadata

runtime catalog model
  + expose resolved presentation

command list/item renderer
  + info/details UI

semantic projection join
  + trigger/result fallback when linked

tests
  + backward compatibility + non-invoking details behavior
```

No new parallel command catalog should be introduced.

## Minimum Tests

```text
old schemaVersion:1 command without helperPresentation parses unchanged
old generated seed remains accepted
new command with helperPresentation round-trips through parser/generator
whenToUse / whatYouGet survive seed generation verbatim
linked trigger/result provide fallback for old commands when available
command without any presentation metadata still renders and invokes normally
info/details click never invokes/inserts the command
normal command click still behaves exactly as before
catalog order unchanged
aliases / commandFamily matching unchanged
permission/routing/ownerFiles unchanged
mobile-accessible explicit details control exists
```

## Boundary

```text
helper commentary
= explains invocation value to the human

command definition
= invocation/navigation contract

Target Module / Lens / workflow owners
= methodology semantics

IDTSPE response
= result of actual planning invocation
```

Helper commentary must never become semantic authority.
