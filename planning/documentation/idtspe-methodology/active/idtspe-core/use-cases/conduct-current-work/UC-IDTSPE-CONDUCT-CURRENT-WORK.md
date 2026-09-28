<a id="uc-idtspe-conduct-current-work"></a>
# UC-IDTSPE-CONDUCT-CURRENT-WORK — Conduct Current Session Work

Status: active fundamental IDTSPE methodology-use Use Case  
Responsibility ID: `IDTSPE.UC.CONDUCT-CURRENT-WORK`

## Situation

Every substantive USER↔AI work turn, whether entered through ordinary language or a Planning Command. The thin Session layer supplies file-backed continuity; this Use Case coordinates the current work without taking semantic ownership from the selected task, Core State, Shell or profile.

## Result

One current Session State and one Turn Work Record describe the input, accepted-state check, bounded primary subject, execution route, actual work, material consequences and closure. A current portable Session State archive is rematerialized at the end of the turn when the host supports it. An explicit separate Proposal Workspace Archive, when requested, remains a separate PRS-centered artifact.

## Process

1. Before substantive methodology execution, bootstrap/reuse [Session State](../../../../../../session/session-state-runtime-contract.md#session-state-runtime) and materialize S0 as early as the host permits. Establish/reuse the Session archive identity and initial portable snapshot (S0 plus truthful navigation, with an absent Manifest marked pending) before substantive execution when writable. S0 carries the immutable [WR-1…WR-7 kernel](../../runtime/WORK-RECORD-PRINCIPLES.md#work-record-zero-state) and references the input, Session State, accepted Manifest, methodology/Work Record revision, target and Session-write authority, continuation gate and retention rule; add PRS/context references when already known. Reconcile bootstrap observations made before physical allocation into S0 truthfully.
2. Run WR-1 [input intake](../../runtime/WORK-RECORD-PRINCIPLES.md#work-record-input). For command input, identify roots/aliases, discover the complete include/process-call graph and retain the result before semantic command execution. Classify USER facts, answers and decisions through their natural intake owner.
3. At WR-2 perform the bounded [Session State/accepted Manifest and PRS check](../../runtime/WORK-RECORD-PRINCIPLES.md#work-record-manifest-check). This is triage, not hidden substantive Manifest reconciliation. Reaffirm the fundamental [methodology Use-Case resolver](../../../../../../documentation/use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md#doc-use-case-applicability-process) after S0; its AI Working Boundary companion and plausible registry scan inform current work. No recursion is created: initial allocation is infrastructure before the resolver, and later rechecks reuse that record.
4. At WR-3 select one bounded primary substantive subject, including Manifest reconciliation when required. At WR-4 record `DIRECT | SHELL | NO_EXECUTION` separately from `ContinuationGate` under the [Work Record principles](../../runtime/WORK-RECORD-PRINCIPLES.md#work-record-execution-routing).
5. At WR-5, before executing an affected current Manifest task, perform the [session-task contextual Question sweep](../../runtime/WORK-RECORD-PRINCIPLES.md#work-record-pre-execution-question-sweep) over the tentative action under the bounded WR-3 subject. Reuse/derive material Questions, integrate permitted in-turn consequences and repeat after material change until a stable readiness conclusion or real gate; WR-2 remains bounded triage. Then follow the selected direct owner or, for `SHELL`, [Compose Current Work](../compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md#uc-idtspe-compose-current-work), reaffirm task-specific Use Cases and the Port Requirement Set, and execute admitted Shell capabilities. A selected SDS Evolution Step also has its separate Step-owned sweep and `RU-EVO-06` before realization; overlapping evidence can be reused without merging conclusions.
6. At WR-6 synchronize material accepted Manifest, PRS, input/context and artifact consequences through their owners. AI-derived prospective Manifest changes remain Proposal-first unless the exact target meaning was already selected by USER; prior accepted revisions remain recoverable.
7. At WR-7 finalize plan versus actual and unresolved gates, update the record and rematerialize the portable Session State archive under its retention policy before handoff. If the host cannot do this, report the real limitation. An independently requested SDS Proposal Workspace Archive is separately produced through its PRS-centered representation owner; the Session archive links its identity/basis rather than merging or silently substituting for it.

## Command projection and boundaries

The direct `веди сессионную работу` command is an invocation/diagnostic shortcut. When included by another command it reaffirms the early Session/S0 basis; the selected root and this Use Case complete WR-5…WR-7 later, after the subject action. A direct invocation of that command follows this complete Use Case. WR-2 has no separate command; `проведи Question sweep текущей задачи` is a focused WR-5 pre-execution invocation and the Use Case still performs the check when it is not explicitly invoked. Focused WR-6/WR-7 commands do not become prerequisites of WR-5: includes execute before their caller.

The record is the one work trace for the turn, not a second Input/Manifest/PRS ontology. Session State authority to persist its own workspace does not grant repository/target mutation. `UC-IDTSPE-COMPOSE-CURRENT-WORK` retains work-composition ownership, and P-14 owns only material external/durable artifact placement, not Session archive existence. No contextual file or `context/` directory is required merely to enter this Use Case.

## Worked example

[Session State worked example](../../../../../../session/examples/SESSION-STATE-WORKED-EXAMPLE.md) shows cold S0 bootstrap and two bounded continuation turns. Its file shapes are illustrative, including an absence of contextual files.
