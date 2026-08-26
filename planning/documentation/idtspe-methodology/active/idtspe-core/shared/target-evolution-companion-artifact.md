
# Target Evolution Companion Artifact

Status: active reusable Artifact Guidance

## Purpose

Persist future/planned evolution of one current owner without polluting the current owner with speculative state.

```text
Current owner / current owner section
= what is selected / true now

small Evolution section in that representation
= default first home for local future notes

<owner>.evolution.md
= promoted companion only when local future planning has independent pressure
```

This is an artifact projection, not automatically a new Target or semantic owner.
Fundamental representation rule: [`../lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md). Separate evolution files are one later materialization option, not the default representation.


## When To Promote A Separate Companion

Do not create a companion merely because future evolution was discussed. Keep small material future notes in the current owner/discovery/strategy Evolution section first. Promote a separate companion when material future planning also gains independent addressability/review/lifecycle value, for example:

```text
accepted/plausible future extensions affect this owner
an intended extension point must be remembered
one architecture transition has a known trigger
global SDS-WORKSPACE-EVOLUTION references a local future path
change-isolation expectations are important
```

No independent companion pressure:

```text
keep Evolution section in current owner/discovery/strategy
or keep no durable evolution material at all
→ no companion file required
```

## Suggested Physical Form After Promotion

```text
domain/CaptureItem.md
domain/CaptureItem.evolution.md

slices/SL-CAP-01.md
slices/SL-CAP-01.evolution.md
```

## Suggested Content — Flexible

```text
# <Owner> Evolution

## Evolution Drivers / Global Refs

## Expected / Planned Changes

## Change Isolation

## High-Level Future Change Paths

## Prepared Extension Points

## Transition Triggers

## Revalidation / Map Feedback
```

Use only the sections that add value.

## High-Level Change-Path Notation

```text
[REUSE]  existing seam/owner/call expected to remain useful
[EXTEND] existing owner/call expected to change
[NEW]    likely future owner/call/test
[NEW?]   plausible but unresolved
[REMOVE] likely future retirement
```

Literal file/class/method/test references are encouraged when already known.

Approximation is allowed.

## Domain Example

Current:

```text
domain/CaptureItem.md
```

Companion:

```text
# CaptureItem Evolution

Global refs:
  EV-17 PDF Capture
  EV-31 Offline Capture

Change Isolation:
  new Capture Source
    SHOULD NOT change CaptureItem

  new Destination
    SHOULD NOT change CaptureItem

  offline synchronization
    MAY require explicit synchronization state

Future path — Offline, only when EV-31 becomes accepted:
  [EXTEND] CaptureItem
    add SyncState
  [NEW] SyncState
  [EXTEND] CaptureItem.markSynced(...)
  [NEW] CaptureItemSyncStateTests
```

## Slice Example

```text
# SL-CAP-01 Evolution

EV-17 PDF Capture:
  [NEW] PdfCaptureEntry
  → [REUSE] captureFeature.commands.capture(...)
  → [REUSE] CaptureController.capture(...)
  → [REUSE] CaptureApplicationService.capture(...)
  → [NEW] PdfCaptureIntegrationTest

Prepared extension point:
  CaptureSource boundary
  intentionally reused here
```

## Guards

```text
companion future plan ≠ current owner truth
[NEW?] ≠ commitment
future implementation path ≠ exact final diff
local companion ≠ duplicate global Workspace Evolution Map
```

Global interpretation belongs to `SDS-WORKSPACE-EVOLUTION.md`; local companion owns only the detailed future path around one current owner.
