<a id="idtspe-pass-trace"></a>
# PASS TRACE AND VISIBILITY — Legacy P-02 Compatibility Contract

Status: active compatibility contract; optional visibility only  
Responsibility ID: `IDTSPE.PASS-TRACE`

## Current authority

`P-02` is retired/reserved as an active Shell-port label. This contract exists only for historical links, explicit legacy trace vocabulary and optional USER-requested visibility. Shell composition/admission/traversal does **not** require a Turn Work Record, Session State or P-02 trace.

When the USER explicitly activates a Work Record, legacy vocabulary may project into that optional record:

```text
legacy P-02 Pass Working Record
→ optional current Turn Work Record

legacy P-02 Initial Work Plan
→ optional initial record basis/kernel

legacy P-02 execution events / Plan Delta
→ observable events / explicit adjustments

legacy P-02 final Plan-vs-Actual
→ optional final record reconciliation
```

Without an explicit Work Record, report only the observable facts needed by the current result/interaction. No compatibility use creates a semantic lifecycle, permission plane or mandatory backing store.

## Preserved invariants

- observable work/runtime facts only; never private chain-of-thought;
- Review Coverage, Need, Proposal/QRP/Decision, Targets and semantic owners retain their natural authority;
- persistence/visibility does not grant target/repository mutation;
- prior trace is reusable only when its subject/basis/operation still matches.

## Shell projection

Active Shell capabilities keep `P-03..P-15` numbering. If optional trace/Work-Record tooling is active, Shell admission/traversal facts may be projected into it; otherwise Shell proceeds directly through its current composition and natural result surfaces.

## Visibility / retention compatibility

INLINE controls conversational visibility. Optional file-backed storage may use explicitly activated Session State. External/durable retained representations route through P-14 when material and authorized. None of these choices changes Shell capability semantics or command permission.
