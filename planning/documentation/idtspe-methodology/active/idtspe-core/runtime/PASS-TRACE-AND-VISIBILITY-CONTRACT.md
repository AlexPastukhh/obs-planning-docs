<a id="idtspe-pass-trace"></a>
# PASS TRACE AND VISIBILITY — Legacy P-02 Compatibility Contract

Status: active compatibility contract  
Responsibility ID: `IDTSPE.PASS-TRACE`

## Current authority

Canonical work-plan/state/trace ownership now belongs to [`IDTSPE.WORK-RUNTIME`](WORK-RECORD-PRINCIPLES.md#idtspe-work-runtime). P-02 is retired/reserved as an active Shell-port label. This contract remains only so historical links, commands and explicit legacy trace vocabulary can project Shell-specific observable facts into the **same current Turn Work Record**.

```text
legacy P-02 Pass Working Record
→ current Turn Work Record

legacy P-02 Initial Work Plan
→ immutable Turn Work Record S0/kernel + current refinements

legacy P-02 execution events / Plan Delta
→ observable events / explicit adjustments in the same Turn Work Record

legacy P-02 final Plan-vs-Actual
→ WR-7 finalization projection
```

No compatibility use creates a second record, working store, semantic lifecycle or permission plane.

## Preserved invariants

- observable work/runtime facts only; never private chain-of-thought;
- incremental-first recording across preparation/continuation; end-of-subject reconstruction is recovery-only;
- retained snapshots/history remain distinguishable from the current pointer/state;
- plan changes are explicit rather than silently rewriting the initial basis;
- Review Coverage, Need, Proposal/QRP/Decision, Targets and semantic owners retain their natural authority;
- persistence/visibility does not grant target/repository mutation.

## Shell projection

When `ExecutionRoute=SHELL`, Shell composition/admission/traversal facts are refined beneath `WR-5` of the existing Turn Work Record. Legacy “P-02 trace” wording means this Shell-specific projection only. Active Shell capabilities keep P-03..P-15 numbering.

## Visibility / retention compatibility

INLINE controls conversational visibility. Ambient file-backed storage belongs to Session State. External/durable retained representations beyond Session State route through P-14 when material and authorized. None of these choices changes canonical Work Record identity.
