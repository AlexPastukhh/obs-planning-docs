# Templates — Screen and UI

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

<a id="template-screen-variant-analysis"></a>
## Template — Screen Set / Screen Variant analysis

Use during Scenario+Screen design exploration when materially different spatial/window realizations are worth comparing. A **Screen Set Variant** changes the overall Screen/window topology; an **individual Screen Variant** changes how one Screen responsibility is realized.

```text
### <candidate Screen Set / Screen Variant>

Scope:
<overall Screen Set | one Screen responsibility>

Scenario / Feature Interaction coverage:
<which selected/candidate behavior this variant must realize>

Screen topology / routes:
<screens, entry/exit and navigation/window relations when material>

Per-Screen responsibilities:
<what each Screen makes available or controls>

Meaningful visible / input / action states:
...

Candidate Screen Behavior Items:
<only durable Screen-owned requirements exposed by this variant>

Impact on Scenario/FI contracts:
<hidden/manual context transfer, changed outputs, recovery/control boundaries or other feedback into behavioral design>

Strengths:
...

Problems:
...

Complexity:
<user / spatial / navigation / implementation / testing / evolution where material>

Risks:
...

Questions:
...

Decision / rationale:
<selected / rejected / still open only when useful>
```

Do not force every visual alternative into a retained artifact. Preserve a variant only while its comparison/rationale remains material to an active design decision.

---
<a id="template-ui-requirement"></a>
## Template — UI / Screen requirement forms

### Interaction/component-local UI Requirement

```text
#### UI-REQ-RPKG-<SEMANTIC-NAME> — <readable UI requirement>
Requirement:
<intentional interaction/component presentation requirement>

Reason:
<why it matters, when useful>
```

Keep this with the owning Feature Interaction when the meaning is genuinely local.

### Screen Behavior Item

Use only when canonical meaning belongs to a Screen/spatial/window context. A technical prefix such as `SBI-*` may be used if/when the application adopts it, but readable semantic identity is more important than inventing a mandatory prefix now.

```text
#### <semantic Screen requirement ID/name> — <readable Screen behavior requirement>
Requirement:
<intentional Screen/spatial/window behavior or visibility/availability rule>

Reason:
<why the Screen realization requires it>
```

Current pixels/layout facts do not become durable requirements automatically.

---
<a id="template-screen-owner"></a>
## Template — Screen owner

Default selected model may live in one `screens.md`; split individual Screen files only when independently useful.

```text
# Replacement Package App — Screens

## Screen Map
<screen inventory / routes / global spatial constraints>

## Scenario × Screen
...
## Feature Interaction × Screen
...

## <Screen readable name>
Purpose:
...
Scenario roles:
...
Feature Interactions:
...
Meaningful visible/input/action states:
...
Screen Behavior Items:
<use Screen requirement form>
Routes / transitions:
...
Spatial / accessibility constraints:
<only intentional material constraints>

## Evolution Impact
<only affected future steps>
```

Screen is spatial/window meaning, not Scenario behavior authority or a frontend Slice.

---
