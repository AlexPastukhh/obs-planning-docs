
# SL-RC-01 Evolution — Research Capture Example

Current owner: `SL-RC-01.md`

## EV-RC-01 — PDF Capture

Expected future path:

```text
[NEW] PdfCaptureEntry
→ [NEW?] PdfSelectionMapper
→ [REUSE] captureFeature.commands.capture(...)
→ [REUSE] CaptureController.capture(...)
→ [REUSE] CaptureApplicationService.capture(...)
→ [REUSE] CaptureItem.create(...)
→ [REUSE] CaptureRepository.save(...)
→ [NEW] PdfCaptureIntegrationTest
```

Prepared extension point:

```text
source normalization boundary
```

Expected property:

```text
adding a source should extend entry/integration code,
not duplicate core capture behavior.
```
