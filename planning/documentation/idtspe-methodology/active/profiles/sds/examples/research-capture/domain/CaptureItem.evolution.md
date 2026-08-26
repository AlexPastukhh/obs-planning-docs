
# CaptureItem Evolution — Research Capture Example

Current owner: `CaptureItem.md`  
Global Source: `../SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md`

## Change Isolation

```text
new Capture Source
  SHOULD NOT require CaptureItem change

new Destination
  SHOULD NOT require CaptureItem change

richer core captured meaning
  MAY require CaptureItem change

offline synchronization
  MAY require explicit synchronization state later
```

## Possible Offline Path — Not Current

Trigger:

```text
offline capability becomes accepted/planned
```

Then consider:

```text
[EXTEND] CaptureItem
[NEW?] SyncState
[NEW?] CaptureItem.markSynced(...)
[NEW] synchronization-related Domain unit tests
```
