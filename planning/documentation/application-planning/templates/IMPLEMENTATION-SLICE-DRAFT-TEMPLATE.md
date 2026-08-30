# Implementation Slice Supporting Template

Status: active supporting template; canonical semantic contract is `TM-IMPLEMENTATION-SLICE`.

Use only when a human-readable Slice artifact is useful under Documentation / Representation. This template does not create a separate frontend/backend planning family or mirror exact code topology.

Canonical owners:

- `../../idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md`
- `../../idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`

## Suggested Shape

```text
# <Slice ID / useful result>

Primary Scenario

RU-SLICE-01 — Outcome / semantic obligations / proof intent

RU-SLICE-02 — Domain Elements Used / Cross-Cutting local obligations / material dependencies

RU-SLICE-03 — Runtime Path [only when runtime semantics are material]

RU-SLICE-04 — Evolution Steps
```

### Evolution Step

Prefer named headings. Include only material fields:

```text
Behavioral Source / Future Meaning
Slice Change
Domain Changes
Implementation Outlook
Proof Impact [when material]
Depends on / After [only genuine dependency]
Cross-Cutting Impact [reference/local obligation only]
```

`Implementation Outlook` stores the selected Slice-specific consequence of Resolution. Generic Questions/Ideas/QRP/Decisions/Evidence remain Core State.

## Representation

```text
semantic Slice owner
≠ dedicated Markdown file
```

A small Slice may stay inline in `SLICE-STRATEGY.md`. A dedicated Slice file is promoted only under real size/review/reuse/lifecycle pressure. Exact classes/methods/call graphs remain code authority. Frontend/backend-specific reasoning stays inside the vertical Slice/UI Lens by default; independently substantial local design may use normal Target Formation.
