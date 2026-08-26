# Artifact Placement Guidance Registry — Compatibility Pointer

Status: **replaced as the human-facing projection**  
Current projection: [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md)

The former flattened table of all `AP-*` / `AG-*` records has been replaced by the literal annotated **SDS Artifact Materialization Tree**.

Canonical source guidance remains distributed in the natural methodology owners:

```text
target-modules/TM-*.md
  → ARTIFACT_PROPOSAL / AP-*

Core + SDS Lens bodies
  → ARTIFACT_GUIDANCE / AG-*
```

The current projection deliberately groups those source records by possible physical artifact/representation so a reader can see:

```text
which Target Module proposes a file/owner/representation
which Lens supports/reroutes it
where the meaning can remain before a separate file exists
when a split/promotion becomes plausible
which files are SDS profile infrastructure rather than AP/AG proposals
```

Do not add new placement semantics to this compatibility file.
