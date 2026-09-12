# Reusable Programming Principles — State / Failure / Execution

Status: active SDS reusable knowledge / theory detail
Role: selectively loaded `RG-PRG-*` guidance; **not a Lens, Target Module, Finding owner or project-truth owner**

Registry and traversal contract: [`../README.md`](../README.md).
Reusable-guidance semantics: [`../../reusable-guidance-model.md`](../../reusable-guidance-model.md).

## Consumption Boundary

Read only the entries selected by the Programming Principles Registry for the current Use-Case/component context. A principle entry supplies reusable questions, trade-offs and candidate patterns. The natural Target/Lens owner performs any operational evaluation and Core Finding/Decision/Requirement mechanics own durable disposition.

<a id="rg-prg-state-mutability-state-and-mutability"></a>
## RG-PRG-STATE-MUTABILITY — State and mutability

Questions:

```text
Which state must change?
Who owns mutation?
Can this value be immutable?
Are there duplicated representations of the same fact?
Can derived state be recomputed instead of persisted?
```

Requirement candidates:

```text
Keep one authority for each durable fact.
Prefer immutable values for semantic facts without identity/lifecycle.
Avoid persisting redundant derived state
unless there is a selected operational need and reconciliation rule.
```
<a id="rg-prg-failure-semantics-error-handling-and-failure-taxonomy"></a>
## RG-PRG-FAILURE-SEMANTICS — Error handling and failure taxonomy

Questions:

```text
Is this expected operation failure, semantic rejection,
infrastructure failure or programmer error?
Does the caller need to act differently for different failures?
Is the failure retryable, uncertain or action-required?
Does the error code/state imply evidence that does not actually exist?
```

Requirement candidates:

```text
Use failure semantics that match the caller's required decision.
Do not collapse unrelated failure classes into generic state divergence.
Do not claim durable-state facts from operation-local failures.
```

Candidate solutions:

- typed Result;
- exception;
- domain error;
- retryable/uncertain/action-required disposition;
- error code + diagnostic cause.

For each candidate solution, evaluate selection questions and risks.
<a id="rg-prg-idempotency-retry-uncertainty-idempotency-retries-uncertainty"></a>
## RG-PRG-IDEMPOTENCY-RETRY-UNCERTAINTY — Idempotency / retries / uncertainty

Questions:

```text
Can an operation be safely repeated?
Can a side effect happen before acknowledgement?
What exact identity makes retries the same logical operation?
How is “already done” proven?
```

Requirement candidates:

```text
Define retry semantics for operations
that can be repeated after partial/uncertain failure.

Use stable operation identity/evidence
where duplicate side effects would be harmful.
```
<a id="rg-prg-concurrency-concurrency-synchronization"></a>
## RG-PRG-CONCURRENCY — Concurrency / synchronization

Questions:

```text
What shared state can race?
What semantic boundary must serialize?
Can optimistic concurrency detect stale writes?
Can lock failure be reported without inventing state meaning?
```

Requirement candidates:

```text
Synchronize only the boundary that needs protection.
Make concurrency failure semantics operation-local
unless actual durable divergence is proven.
```
<a id="rg-prg-resource-management-resource-management"></a>
## RG-PRG-RESOURCE-MANAGEMENT — Resource management

Questions:

```text
What resources must always be released?
What happens on cancellation/exception?
Can temporary files/processes/locks leak?
Does cleanup failure hide the original result?
```

Requirement candidates:

```text
Use deterministic resource ownership/cleanup
for files, processes, locks, streams and temporary state.

Make cleanup behavior explicit
where leaks affect correctness or security.
```
<a id="rg-prg-determinism-time-identity-determinism-time-randomness-identity-generation"></a>
## RG-PRG-DETERMINISM-TIME-IDENTITY — Determinism / time / randomness / identity generation

Questions:

```text
Does correctness depend on current time, randomness, generated identity or process environment?
Can important behavior be reproduced deterministically in proof?
Is generated identity part of semantic truth or only implementation detail?
What happens on clock skew, duplicate generation or process restart?
```

Requirement candidates:

```text
Make correctness-relevant time/random/identity dependencies explicit at a semantic or capability boundary.
Prefer deterministic proof control for nondeterministic inputs that materially affect behavior.
Do not persist or expose generated values as semantic identity unless their continuity actually matters.
```

Candidate solutions may include:

- explicit Clock capability;
- explicit ID generator;
- cryptographically secure randomness where security requires it;
- deterministic fake/test capability;
- monotonic/version value when wall-clock time is not the actual semantic need.

Each option should record applicability and failure assumptions.
<a id="rg-prg-timeout-cancellation-bounds-timeouts-cancellation-bounded-work"></a>
## RG-PRG-TIMEOUT-CANCELLATION-BOUNDS — Timeouts / cancellation / bounded work

Questions:

```text
Can this operation block indefinitely on process/network/filesystem/user input?
Who owns timeout/cancellation policy?
What durable state is safe when cancellation occurs between local and external effects?
Does cancellation mean “effect did not happen”, or only “caller stopped waiting”?
Can retry after timeout duplicate an uncertain effect?
What resource/capacity bounds prevent unbounded memory/process/thread/file growth?
```

Requirement candidates:

```text
Bound operations whose indefinite wait/resource growth would violate supported behavior.
Do not interpret timeout/cancellation as proof that an external effect did not occur.
Make cancellation/timeout recovery consistent with the same uncertainty and retry semantics as other partial failures.
```

## Provenance

These entries preserve the corresponding R2 `reusable-programming-principles.md` semantic groups. Stable `RG-PRG-*` identities and routing metadata are SDS migration additions; they do not convert reusable guidance into project authority.
