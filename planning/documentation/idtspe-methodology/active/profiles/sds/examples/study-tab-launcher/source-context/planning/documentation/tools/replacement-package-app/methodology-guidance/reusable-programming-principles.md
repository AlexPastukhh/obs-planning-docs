# Reusable Programming Principles Discovery

Status: recommended reusable implementation-discovery guidance
Common reusable model: [`reusable-guidance-model.md`](reusable-guidance-model.md)
Process authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)
Consumed by implementation discovery, Requirements discovery, exact planning and review when generic design-quality reasoning is material.

## Essential vs accidental complexity / Complexity delta

Session Methodology requires material proposals to assess Complexity delta.
This guide owns reusable implementation reasoning used for that assessment.

Relevant dimensions include, when material:

```text
semantic concepts / states / rules
owners / capabilities / boundaries
classes / interfaces / adapters / patterns
state / lifecycle / retry / recovery
coupling / change locality
maintenance burden
proof burden
operational failure/diagnostic burden
migration cost
known Evolution consequence
cognitive load
```

Questions:

```text
What persistent complexity is introduced?
What persistent complexity is removed?
What new entity/boundary must be maintained?
Does added structure reduce coupling or duplicated knowledge?
Does a smaller immediate diff create a larger long-term maintenance surface?
Which cost is one-time migration cost and which is permanent?
How does the option affect known Evolution locality?
What context must a maintainer understand afterward?
```

Do not equate fewer classes/interfaces/lines with lower total system complexity.
A solution may add explicit structure while reducing total complexity.

When real options trade different complexity dimensions, compare them against the current situation's decision priorities rather than applying one universal score.

## Semantic clarity and explicit contracts

Questions:

```text
Can a reader understand semantic responsibility from names/public contracts?
Are important states/results/failures explicit?
Is a boolean/string/map hiding a meaningful semantic type?
Does the API permit invalid or ambiguous combinations?
```

Requirement candidates:

```text
Prefer semantic names/types/contracts for behavior that affects correctness.
Make invalid states difficult to represent where doing so materially improves correctness.
Do not introduce wrapper types with no semantic value merely for ceremony.
```

Risks:

- primitive obsession;
- type explosion;
- generic result/state bags;
- semantic meaning hidden in comments.

## Cohesion / Separation of Concerns / Single Responsibility

Questions:

```text
What reason does this unit have to change?
Are unrelated policies/mechanics owned together?
Does extracting this responsibility make local reasoning clearer?
Is the proposed split semantic, or only a technical-layer split?
```

Requirement candidates:

```text
Keep closely related behavior/state/proof reasoning together.
Separate responsibilities that evolve for materially different reasons.
Do not fragment cohesive behavior into tiny units merely to satisfy a rule mechanically.
```

## Coupling and dependency direction

Questions:

```text
What must this unit know about collaborators?
Is it coupled to concrete incidental mechanics or a semantic capability?
Would a collaborator change force unrelated consumer changes?
Where is dependency inversion actually useful?
```

Requirement candidates:

```text
Depend on stable semantic contracts where substitution, proof or evolution needs a seam.
Avoid interfaces/abstractions without a real alternate, boundary or testing/evolution reason.
```

## Encapsulation / information hiding

Questions:

```text
Can callers bypass invariant-preserving behavior?
Is internal representation leaking into consumers?
Does the caller need this detail to make a semantic decision?
```

Requirement candidates:

```text
Hide representation details that callers do not need.
Expose semantic operations/results rather than mutable internal state where correctness benefits.
```

## DRY vs duplication vs premature abstraction

Questions:

```text
Is duplicated code the same semantic responsibility or only superficially similar?
Will these copies evolve together?
Would abstraction introduce branching/configuration that makes local behavior harder?
```

Requirement candidates:

```text
Remove duplication when one coherent responsibility is genuinely shared.
Prefer temporary duplication over a wrong abstraction
when shared meaning is not established.
```

Candidate options:

- keep duplication temporarily;
- extract helper;
- extract Shared Capability;
- parameterize;
- strategy/policy abstraction.

Each option should record risks/downsides.

## KISS / YAGNI / known Evolution

Questions:

```text
Is this mechanism required by current behavior or known Evolution?
What simpler solution satisfies the selected Requirement?
Are we implementing hypothetical future flexibility?
Would the simplest design create a known near-term Forced Migration?
```

Requirement candidates:

```text
Prefer the simplest design that satisfies current selected behavior
and known Evolution pressure.

Do not implement speculative extension points for unknown futures.
```

## Composition vs inheritance / extension shape

Questions:

```text
Is variation genuine “is-a” semantic substitutability or merely code reuse?
Can composition/local policy express the difference more explicitly?
Would inheritance make behavior depend on fragile superclass internals?
```

Requirement candidate:

```text
Prefer composition for variation/reuse
unless inheritance represents a genuine stable substitutable semantic relationship.
```

## State and mutability

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

## Error handling and failure taxonomy

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

## Idempotency / retries / uncertainty

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

## Concurrency / synchronization

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

## Resource management

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

## Security / authority / trust boundaries

Questions:

```text
What input/state is trusted?
What identity is being authorized?
Can the checked target differ from the used target?
Can mutable configuration change authority after verification?
What is the least privilege needed?
```

Requirement candidates:

```text
Bind authorization/verification to the exact resource/effect later used.
Fail closed when authority cannot be proven for a destructive/external effect.
Avoid TOCTOU between verification and effect when identity matters.
```

## Observability and diagnostics

Questions:

```text
Can a failure be diagnosed without exposing secrets?
Do logs identify the semantic operation/work/resource?
Can uncertain external effects be distinguished from confirmed failure?
```

Requirement candidates:

```text
Diagnostics should preserve enough semantic correlation to explain failures.
Do not log secrets or credentials.
Operation result and durable state evidence should remain distinguishable.
```

## Testability and refactoring resilience

Questions:

```text
Can selected behavior be proven through a stable semantic boundary?
Does a test depend on private call order that is not itself required?
What fake/in-memory boundary is justified?
Does production need a seam because otherwise important behavior cannot be credibly proven?
```

Requirement candidates:

```text
Prefer proof through semantic inputs/results/state/effects.
Introduce a test seam when it corresponds to a real capability/boundary,
not only to mock private internals.
Keep test names behavioral.
```

## Performance and capacity

Questions:

```text
Is there a real performance/capacity Requirement?
What Evidence establishes the target?
Is optimization changing semantic clarity or correctness?
```

Requirement candidates:

```text
Make performance constraints explicit and evidence-based when material.
Do not optimize speculative bottlenecks at the cost of correctness/local reasoning.
```

## Interface segregation / substitutability / extension contracts

Questions:

```text
Does a consumer depend on operations it does not need?
Can one implementation be substituted for another without changing the promised semantics?
Is an interface expressing one coherent capability or several unrelated ones?
Does an extension point preserve caller assumptions, failure/result semantics and invariants?
Is “open for extension” solving a known current/evolution need or only hypothetical flexibility?
```

Requirement candidates:

```text
Keep capability contracts cohesive enough that consumers depend only on meaning they need.
Require substitutable implementations to preserve the semantic contract, not merely the method signature.
Introduce extension seams only when current proof/substitution or known Evolution justifies them.
```

Risks / problem classes:

- “fat” interfaces that couple unrelated consumers;
- fake interfaces with one implementation and no boundary reason;
- subtype/strategy implementations that satisfy signatures but violate caller assumptions;
- plugin/extension contracts that accidentally expose private implementation structure.

## Boundary validation / parsing / normalization

Questions:

```text
Where does untrusted or weakly-typed input become a semantic value?
What must be validated before the input is allowed to influence state or side effects?
Is normalization semantic and canonical, or could it silently change identity?
Are validation and use performed against the same effective value?
Can invalid combinations cross deeper boundaries and fail later with misleading errors?
```

Requirement candidates:

```text
Validate external/weakly-typed input at the narrowest boundary that can establish semantic meaning.
Canonicalize identity only with an explicit semantic rule; do not silently collapse distinct values.
Bind validation to the exact value later used for correctness/security-sensitive effects.
```

## Determinism / time / randomness / identity generation

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

## Timeouts / cancellation / bounded work

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

## Compatibility / versioning / migration

Questions:

```text
Is this format/API/state schema an actual compatibility contract?
Which deployed producer/consumer versions must interoperate?
Can a representation change be an ordinary refactor, or is migration/compatibility behavior required?
How does an old/unknown version fail?
Can compatibility code be removed at a known Evolution Step?
Are exact names/fields/paths truly contractual, or merely current implementation details?
```

Requirement candidates:

```text
Treat representation details as durable Requirements only when a real compatibility boundary makes them semantic/contractual.
Version persisted/wire formats when incompatible representations may coexist.
Fail closed or migrate explicitly when old state cannot be interpreted safely.
Keep compatibility lifetime tied to explicit deployed-consumer/Evolution reality rather than permanent defensive code.
```

This group is also the main guard against accidentally putting literal code names into durable owners: a literal name is allowed only when this discovery establishes that the name is itself part of a real compatibility contract.

---


---
